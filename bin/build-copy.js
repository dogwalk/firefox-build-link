#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const rimraf = require('rimraf');
const pify = require('pify');
const path = require('path');
const params = Object.assign(
  {},
  {
    stdio: 'inherit',
    env: process.env,
  }
);

// http://stackoverflow.com/questions/4770532/error-when-cloning-git-shallow-repository
pify(rimraf)(path.join('.git', 'shallow')).then(() =>
  new Promise((resolve, reject) => {
    const command = spawn('git', ['clone', '.', 'dist'], params);
    command.on('error', (err) => {
      reject(err);
    });
    command.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(`exit code is ${code}`);
      }
    });
  })
).then(() =>
  // remove bin/* from xpi package
  pify(rimraf)(path.join('dist', 'bin'))
).then(() =>
  // remove exclude-addon/* from xpi package
  pify(rimraf)(path.join('dist', 'exclude-addon'))
).catch((error) => {
  console.error(error);
  process.exit(1);
});
