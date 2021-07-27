/* eslint-disable global-require */

/**
 * @author Augusto Lozada <@augustolzd>
 * @version 1.0
 */

const Fs = require('fs');
const Path = require('path');
const { spawn } = require('child_process');
const logger = require('node-color-log');
const Task = require('./tasks');

async function spawnTask(task, file) {
  let balancers;

  if (typeof task.balancers === 'function') {
    balancers = await task.balancers();
  } else {
    balancers = task.balancers;
  }
  const tasks = balancers.map((balancer) => {
    const taskBalancer = spawn('node', [
      Path.join(__dirname, 'manager.js'),
      file,
      balancer,
    ]);

    taskBalancer.stdout.on('data', (data) => {
      logger.info(`${data.toString().trim()}`);
    });

    taskBalancer.stderr.on('data', (data) => {
      logger.error(`${data.toString().trim()}`);
    });

    taskBalancer.on('close', (code) => {
      logger.warn(
        `TASK ${task.name}:${balancer} exits with code "${code}"`,
      );
    });
    return taskBalancer;
  });

  process.on('SIGINT', () => {
    tasks.forEach((taskToKill) => {
      taskToKill.kill('SIGINT');
    });
  });
}

function readFolder(path) {
  const folders = new Set();
  const files = new Set();

  Fs.readdirSync(path).forEach((file) => {
    const fullPath = Path.join(path, file);
    const isDir = Fs.lstatSync(fullPath).isDirectory();
    if (isDir) {
      folders.add(fullPath);
    } else if (file === 'task.js') {
      files.add(fullPath);
    }
  });
  if (folders.size) {
    folders.forEach((folder) => {
      const folderFiles = readFolder(folder);

      if (folderFiles.size) {
        folderFiles.forEach((file) => {
          if (!files.has(file)) {
            files.add(file);
          }
        });
      }
    });
  }

  return files;
}

/**
 * @param {object} param0
 * @param {string} param0.customPath Path to the folder to looking the express routes.
 */

function loader({ customPath } = {}) {
  const fullPath = customPath
    ? Path.join(process.env.INIT_CWD || process.cwd(), customPath)
    : Path.join(process.env.INIT_CWD || process.cwd());
  const files = readFolder(fullPath);

  if (files.size === 0) {
    logger.warn('Tasks not found');
  }

  files.forEach((file) => {
    const taskFile = require(file);
    if (taskFile instanceof Task) {
      spawnTask(taskFile, file);
    }
  });
}

module.exports = {
  loader,
  Task,
};
