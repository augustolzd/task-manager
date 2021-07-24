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

function spawnTask(task, file) {
  task.balancers.forEach((balancer) => {
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

    process.on('SIGINT', () => {
      taskBalancer.kill('SIGINT');
    });

    taskBalancer.on('close', (code) => {
      logger.warn(
        `TASK ${task.name}:${balancer} exits with code "${code}"`,
      );
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
    } else {
      files.add(fullPath);
    }
  });
  if (folders.size) {
    folders.forEach((folder) => {
      const folderFiles = readFolder(folder);

      if (folderFiles.size) {
        folderFiles.forEach((file) => files.add(file));
      }
    });
  }

  return files;
}

/**
 * @param {object} param0
 * @param {string} param0.customPath Path to the folder to looking the express routes.
 */

module.exports = ({ customPath } = {}) => {
  const fullPath = customPath
    ? Path.join(process.env.INIT_CWD || process.cwd(), customPath)
    : Path.join(process.env.INIT_CWD || process.cwd());

  const files = readFolder(fullPath);
  files.forEach((file) => {
    const taskFile = require(file);
    if (taskFile instanceof Task) {
      spawnTask(taskFile, file);
    }
  });
};
