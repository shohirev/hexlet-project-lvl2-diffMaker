#!/usr/bin/env node
import compare from '..';
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFilepath> <secondFilepath>')
  .action((firstFilepath, secondFilepath) => {
    console.log(compare(firstFilepath, secondFilepath, program.format));
  });

program.parse(process.argv);