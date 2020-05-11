#!/usr/bin/env node
import program from 'commander';
import compare from '..';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFilepath> <secondFilepath>')
  .action((firstFilepath, secondFilepath) => {
    console.log(compare(firstFilepath, secondFilepath, program.format));
  });

program.parse(process.argv);
