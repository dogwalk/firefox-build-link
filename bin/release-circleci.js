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
const yargs = require('yargs');
const path = require('path');
const assert = require('assert');
const ghrOptions = {
  tag: process.env.CIRCLE_TAG,
  ghrPath: path.join(process.cwd(), 'bin', 'ghr-linux_amd64'),
  targetPath: path.join(process.cwd(), 'dist', 'pkg'),
};
const argv = yargs.default(ghrOptions).argv;
assert(argv.tag !== undefined && argv.tag !== '');

const ghr = spawn(argv.ghrPath, [argv.tag, argv.targetPath], params);
ghr.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
