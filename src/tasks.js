class Task {
  constructor(name, interval, task, balancers) {
    this.name = name;
    this.interval = interval;
    this.task = task;
    this.balancers = balancers || [0];

    return this;
  }

  data() {
    console.log('DATA', this.name);
  }
}

module.exports = Task;
