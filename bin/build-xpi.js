#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: process.env,
  }
);

const xpi = spawn('npm', ['run', 'xpi'], params);
xpi.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
