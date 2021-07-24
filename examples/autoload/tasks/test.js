const Task = require('../../../src/tasks');

module.exports = new Task('Test', false, async () => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
  console.log('Hi');
});
