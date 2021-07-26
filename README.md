# Tasks Manager

Simple and useful tasks manager for nodejs.

```js
const {loader} = require('task-manager');

loader();
```

## Instalation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/). Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with 
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install tasks-manager
```
## Features
* Autoloader of tasks
* Async/Sync Tasks
* Interval Time assignation
* Execution after finish the previous execution
* Balancers Logic
* Dynamic Balancer
* Process per task and balancer


## Usage

Create a new file with name `task.js` in the root folder or subfolder with the follow structure:

```js
const {Task} = require('tasks-manager');

module.exports = new Task({
  name: 'Greater',
  task: async function task(balancer) {
    console.log(`Hi, I'm a task with name ${this.name} and my name is ${balancer}`);
  },
  interval: 2000,
  balancers: ['John', 'Jane'],
});
```

In the `index.js` just add the loader

```js
const {loader} = require('task-manager');

loader();
```

Now execute the code `npm start` or `node index.js`