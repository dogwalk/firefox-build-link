#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const mkdirp = require('mkdirp');
const cpy = require('cpy');
const pify = require('pify');
const path = require('path');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: process.env,
  }
);

new Promise((resolve, reject) => {
  const xpi = spawn('npm', ['run', 'xpi'], params);
  xpi.on('error', (err) => {
    reject(err);
  });
  xpi.on('close', (code) => {
    (code === 0) ? resolve() : reject(`exit code is ${code}`);
  });
}).then(() => {
  return pify(mkdirp)(path.join('dist', 'pkg'));
}).then(() => {
  return cpy([path.join('dist', '*.xpi')], path.join('dist', 'pkg'));
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
