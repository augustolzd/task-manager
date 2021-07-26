const { argv } = require('process');

const [, , taskFile, balancer] = argv;
const task = require(taskFile);

(async function handleTask() {
  if (task.interval) {
    setInterval(() => {
      task.task(balancer);
    }, task.interval);
  } else {
    await task.task(balancer);
    handleTask();
  }
}());

process.on('SIGINT', (signal) => {
  process.exit(signal);
});

process.on('close', (code) => {
  console.log(code);
});
