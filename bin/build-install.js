#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const pify = require('pify');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: Object.assign(
      {},
      process.env,
      { NODE_ENV: 'production' }
    ),
  }
);

pify(spawn)('npm', ['install'], params)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
