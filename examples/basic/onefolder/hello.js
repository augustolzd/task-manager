const Task = require('../../../src/tasks');

module.exports = new Task({
  name: 'Test',
  task: async function task() {
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    });
    console.log('Hello World from a folder!');
  },
});
