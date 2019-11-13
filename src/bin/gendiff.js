#!/usr/bin/env node
import differ from '..';

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
program
  .name("gendiff")
  .usage("[options] <firstConfig> <secondConfig>")
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> [secondConfig]')
  .action(function (firstConfig, secondConfig) {
    console.log(differ(firstConfig, secondConfig));
  });

program.parse(process.argv);