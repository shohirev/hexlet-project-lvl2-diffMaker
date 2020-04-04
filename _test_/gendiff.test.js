import fs from 'fs';
import path from 'path';
import compare from '../src';
import getResultByFormat from './_fixtures_/results';

test('get diff of JSON', () => {;
  const beforeJSON = `./_test_/_fixtures_/before.json`;
  const afterJSON = `./_test_/_fixtures_/after.json`;
  expect(compare(beforeJSON, afterJSON)).toEqual(getResultByFormat('tree'));
  expect(compare(beforeJSON, afterJSON, 'plain')).toEqual(getResultByFormat('plain'));
  expect(compare(beforeJSON, afterJSON, 'json')).toEqual(getResultByFormat('JSON'));
});

test('get diff of YAML', () => {
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
});