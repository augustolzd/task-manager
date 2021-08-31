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

  handleTask();
}
// eslint-disable-next-line no-shadow
async function initTask(balancer) {
  if (task.init && typeof task.init === 'function') {
    await task.init(balancer);
  }
  handleTask();
}

initTask(balancer);

process.on('SIGINT', (signal) => {
  process.exit(signal);
});

process.on('close', (code) => {
  console.log(code);
});
