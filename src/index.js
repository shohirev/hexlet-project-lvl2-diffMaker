import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './differ.js';
import render from './formatters/index.js';

export default (fileBeforePath, fileAfterPath, outputFormat = 'tree') => {
  const fileBeforeContent = fs.readFileSync(fileBeforePath, 'utf-8');

  const fileAfterContent = fs.readFileSync(fileAfterPath, 'utf-8');

  const comparedFileType = path.extname(`${fileBeforePath}`).slice(1);

  const dataBefore = parse(fileBeforeContent, comparedFileType);

  const dataAfter = parse(fileAfterContent, comparedFileType);

  const differ = buildDiff(dataBefore, dataAfter);

  const resultOutput = render(differ, outputFormat);

  return resultOutput;
};
