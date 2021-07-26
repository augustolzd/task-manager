const Joi = require('joi');

class Task {
  /**
   * @param {string} name Name of the task
   * @param {number} interval Time of each interaction, 0 for async tasks
   * @param {function} task The task logic to be executed
   * @param {array} balancers Balancer names
   */
  constructor(data) {
    const validTaskParams = Joi.object()
      .keys({
        name: Joi.string().required(),
        interval: Joi.number().default(0),
        task: Joi.function().required(),
        balancers: Joi.alternatives().try(Joi.array(), Joi.function()).default([0]),
      }).validate(data);

    if (validTaskParams.error) {
      throw validTaskParams.error;
    }

    const {
      name, interval, task, balancers,
    } = validTaskParams.value;

    this.name = name;
    this.interval = interval;
    this.task = task;
    this.balancers = balancers || [0];

    return this;
  }
}

module.exports = Task;
