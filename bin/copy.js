#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');
const pify = require('pify');
const params = Object.assign(
  {},
  {
    stdio: 'inherit',
    env: process.env,
  }
);

pify(spawn)('git', ['worktree', 'add', '--detach', 'dist'], params)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
