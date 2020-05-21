import fs from 'fs';
import path from 'path';

import parse from './parsers.js';
import buildDiff from './differ.js';
import render from './formatters/index.js';

export default (beforeFilePath, afterFilePath, outputFormat = 'tree') => {
  const beforeContent = fs.readFileSync(beforeFilePath, 'utf-8');
  const afterContent = fs.readFileSync(afterFilePath, 'utf-8');
  const comparedFileType = path.extname(`${beforeFilePath}`).slice(1);

  const before = parse(beforeContent, comparedFileType);
  const after = parse(afterContent, comparedFileType);

  const diff = buildDiff(before, after);

  const resultOutput = render(diff, outputFormat);

  return resultOutput;
};
