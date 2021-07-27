const { Task } = require('../../src');

module.exports = new Task({
  name: 'Greater',

  async task(balancer) {
    console.log(`Hi, I m just a greater! the task with name ${this.name} and my name is ${balancer}`);
  },
  interval: 10000,

  async  balancers() {
    const balacing = new Set();
    for (let i = 0; i < 15; i += 1) {
      balacing.add(i);
    }
    return [...balacing];
  },
});
