#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const rimraf = require('rimraf');
const params = Object.assign(
  {},
  {
    stdio: 'inherit',
    env: process.env,
  }
);

rimraf('dist', () => {
  console.error(err);
  process.exit(1);
});

const gitDelete = spawn('git', ['branch', '-d', 'dist'], params);
gitDelete.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

