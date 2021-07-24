const { argv } = require('process');

const [, , taskFile, balancer] = argv;
const task = require(taskFile);

if (task.interval) {
  setInterval(() => {
    task.task(balancer);
  }, task.interval);
} else {
  (async function handleTask() {
    await task.task(balancer);
    handleTask();
  }());
}

process.on('SIGINT', (signal) => {
  process.exit(signal);
});

process.on('close', (code) => {
  console.log(code);
});
