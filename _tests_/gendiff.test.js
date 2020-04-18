import fs from 'fs';
import path from 'path';
import compare from '../src';

const fileTypes = ['json', 'yml', 'ini'];

const buildPath = (name) => path.join(__dirname, '_fixtures_', name);

test.each(fileTypes)('testing another file type', (fileType) => {
  const before = buildPath(`before.${fileType}`);
  const after = buildPath(`after.${fileType}`);
  expect(compare(before, after)).toEqual(fs.readFileSync(buildPath('resultTree.txt'), 'utf-8'));
  expect(compare(before, after, 'plain')).toMatch(fs.readFileSync(buildPath('resultPlain.txt'), 'utf-8'));
  expect(compare(before, after, 'json')).toEqual(fs.readFileSync(buildPath('resultJSON.txt'), 'utf-8'));
});