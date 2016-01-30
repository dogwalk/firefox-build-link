#!/usr/bin/env node

/* eslint-disable no-console */

// Use AMO_API_KEY and AMO_API_SECRET

const spawn = require('cross-spawn-async');
const mkdirp = require('mkdirp');
const cpy = require('cpy');
const pify = require('pify');
const path = require('path');
const yargs = require('yargs');
const assert = require('assert');
const glob = require('glob');
const params = Object.assign(
  {},
  {
    cwd: 'dist',
    stdio: 'inherit',
    env: process.env,
  }
);
const jpmPath = path.join(process.cwd(), 'node_modules', '.bin', 'jpm');
const signOptions = {
  apiKey: process.env.AMO_API_KEY,
  apiSecret: process.env.AMO_API_SECRET,
  timeout: (5 * 60 * 1000).toString(),
};
const argv = yargs.default(signOptions).argv;
assert(argv.apiKey !== undefined && argv.apiKey !== '');
assert(argv.apiSecret !== undefined && argv.apiSecret !== '');

pify(glob)('*.xpi', { cwd: path.join(process.cwd(), 'dist') }
).then((result) => {
  const xpiFile = result[0];
  return new Promise((resolve, reject) => {
    const command = spawn(
      jpmPath,
      [
        'sign',
        '--api-key',
        argv.apiKey,
        '--api-secret',
        argv.apiSecret,
        '--xpi',
        xpiFile,
        '--timeout',
        argv.timeout,
      ],
      params
    );
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
  });
}).then(() =>
  pify(mkdirp)(path.join('dist', 'pkg'))
).then(() =>
  cpy([path.join('dist', '*.xpi')], path.join('dist', 'pkg'))
).catch((error) => {
  console.error(error);
  process.exit(1);
});
