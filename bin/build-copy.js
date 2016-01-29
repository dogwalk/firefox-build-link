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
}).then(() =>
  // remove bin/* from xpi package
  pify(rimraf)(path.join('dist', 'bin'))
).catch((error) => {
  console.error(error);
  process.exit(1);
});
