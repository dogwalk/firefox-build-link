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
const ghrOptions = {
  tag: process.env.CIRCLE_TAG,
  ghrPath: path.join(process.cwd(), 'bin', 'ghr-linux_amd64'),
};
const argv = yargs.default(ghrOptions).argv;

const ghr = spawn(argv.ghrPath, [argv.tag, 'install'], params);
ghr.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
