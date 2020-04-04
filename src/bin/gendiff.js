#!/usr/bin/env node
import compare from '..';
import program from 'commander';

//const program = require('commander');

/*program.version('0.0.1');
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
    console.log(compare(firstConfig, secondConfig));
  });*/

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFilepath> <secondFilepath>')
  .action((firstFilepath, secondFilepath) => {
    console.log(compare(firstFilepath, secondFilepath, program.format));
  });

program.parse(process.argv);

/*import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstFilepath> <secondFilepath>')
  .action((firstFilepath, secondFilepath) => {
    console.log(genDiff(firstFilepath, secondFilepath, program.format));
  });

program.parse(process.argv);*/