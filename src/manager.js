const { argv } = require('process');

const [, , taskFile, balancer] = argv;
const task = require(taskFile);

async function handleTask() {
  if (task.interval) {
    setInterval(() => {
      task.task(balancer);
    }, task.interval);
  } else {
    await task.task(balancer);
    handleTask();
  }
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
