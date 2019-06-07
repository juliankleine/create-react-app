/* eslint-disable import/order */
// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @remove-on-eject-end

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
// @remove-on-eject-begin
// Do the preflight check (only happens before eject).
const verifyPackageTree = require('./utils/verifyPackageTree');

if (process.env.SKIP_PREFLIGHT_CHECK !== 'true') {
  verifyPackageTree();
}
const verifyTypeScriptSetup = require('./utils/verifyTypeScriptSetup');

verifyTypeScriptSetup();
// @remove-on-eject-end

const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const nodemon = require('nodemon');
const paths = require('../config/paths');

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.serverIndexJs])) {
  process.exit(1);
}

console.log(chalk.cyan('Starting the backend server...\n'));

const babelConfig = `${paths.ownPath}/config/babel.config.js`;

nodemon({
  script: 'src/server/index.js',
  watch: ['src/server'],
  execMap: {
    js: `npx babel-node --config-file ${babelConfig}`,
  },
  env: {
    NODE_ENV: 'development',
  },
});

nodemon
  .on('start', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log(
      `${chalk.green('Server')} started on port ${chalk.yellow('8080')}.\n`
    );
  })
  .on('message', event => {
    console.log('got message event', event);
  })
  .on('crash', () => {
    console.log(chalk.red('Server crashed for some reason'));
  });

['SIGINT', 'SIGTERM', nodemon].forEach(sig => {
  process.on(sig, () => {
    process.exit();
  });
});
