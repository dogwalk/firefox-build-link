#!/usr/bin/env node

/* eslint-disable no-console */

const spawn = require('cross-spawn-async');

const worktree = spawn('git', ['worktree', 'add', 'dist'], { stdio: 'inherit' });
worktree.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
