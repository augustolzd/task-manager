const { Task } = require('../../src');

module.exports = new Task({
  name: 'TaskWithInit',
  init() {
    console.log('INIT CALLED');
    this.value = 'Hola!';
  },
  async task() {
    console.log('task CALLED');
    console.log(this.value);
  },
  interval: 10000,
});
