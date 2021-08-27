const { argv } = require('process');

const [, , taskFile, balancer] = argv;
const task = require(taskFile);

async function handleTask() {
  await task.task(balancer);

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, task.interval * 1000 || 1000);
  });
}

async function initTask() {
  if (task.init && typeof task.init === 'function') {
    await task.init();
  }
  handleTask();
}

initTask();

process.on('SIGINT', (signal) => {
  process.exit(signal);
});

process.on('close', (code) => {
  console.log(code);
});
