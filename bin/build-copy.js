#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const params = Object.assign(
  {},
  {
    stdio: 'inherit',
    env: process.env,
  }
);

const clone = spawn('git', ['clone', '.', 'dist'], params);
clone.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
