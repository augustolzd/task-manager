const Task = require('../../src/tasks');

module.exports = new Task({
  name: 'Greater',

  async task(balancer) {
    console.log(`Hi, I m just a greater! the task with name ${this.name} and my name is ${balancer}`);
  },
  interval: 500,

  async  balancers() {
    const balancers = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Value A', 'Value B']);
      });
    }, 300);
    return balancers;
  },
});
