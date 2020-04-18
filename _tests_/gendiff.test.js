import fs from 'fs';
import path from 'path';
import compare from '../src';
//import getResultByFormat from './_fixtures_/results';

const fileTypes = ['json', 'yml', /*'ini'*/];

const buildPath = (name) => path.join(__dirname, '_fixtures_', name);

test.each(fileTypes)('testing another file type', (fileType) => {
  const before = buildPath(`before.${fileType}`);
  const after = buildPath(`after.${fileType}`);
  expect(compare(before, after)).toEqual(fs.readFileSync(buildPath('resultTree.txt'), 'utf-8'));
  expect(compare(before, after, 'plain')).toEqual(fs.readFileSync(buildPath('resultPlain.txt'), 'utf-8'));
  expect(compare(before, after, 'json')).toEqual(fs.readFileSync(buildPath('resultJSON.txt'), 'utf-8'));
});

/*test('get diff of JSON', () => {;
  const beforeJSON = `./_test_/_fixtures_/before.json`;
  const afterJSON = `./_test_/_fixtures_/after.json`;
  expect(compare(beforeJSON, afterJSON)).toEqual(getResultByFormat('tree'));
  expect(compare(beforeJSON, afterJSON, 'plain')).toEqual(getResultByFormat('plain'));
  expect(compare(beforeJSON, afterJSON, 'json')).toEqual(getResultByFormat('JSON'));
});

test('get diff of YML', () => {
  const beforeYAML = `./_test_/_fixtures_/before.yml`;
  const afterYAML = `./_test_/_fixtures_/after.yml`;
  expect(compare(beforeYAML, afterYAML)).toEqual(getResultByFormat('tree'));
  expect(compare(beforeYAML, afterYAML, 'plain')).toEqual(getResultByFormat('plain'));
  expect(compare(beforeYAML, afterYAML, 'json')).toEqual(getResultByFormat('JSON'));
});

test('get diff of INI', () => {
  const beforeINI = `./_test_/_fixtures_/before.ini`;
  const afterINI = `./_test_/_fixtures_/after.ini`;
  expect(compare(beforeINI, afterINI)).toEqual(getResultByFormat('tree'));
  expect(compare(beforeINI, afterINI, 'plain')).toEqual(getResultByFormat('plain'));
  expect(compare(beforeINI, afterINI, 'json')).toEqual(getResultByFormat('JSONofINI'));
});*/