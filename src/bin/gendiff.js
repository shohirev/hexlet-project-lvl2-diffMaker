#!/usr/bin/env node

const program = require('commander');
program.version('0.0.1');
program.on('--help', function(){
  console.log('');
  console.log('Compares two configuration files and shows a difference.');
  console.log('');
  console.log('Examples:');
  console.log('  $ custom-help --help');
  console.log('  $ custom-help -h');
});
program.parse(process.argv);