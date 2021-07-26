const { Task } = require('../../src');

module.exports = new Task({
  name: 'Greater',
  task: async function task(balancer) {
    console.log(`Hi, I m just a greater! the task with name ${this.name} and my name is ${balancer}`);
  },
  interval: 2000,
  balancers: ['John', 'Jane'],
});
