import fs from 'fs';
import path from 'path';
import compare from '../src';

const dataTypes = ['json', 'yml', 'ini'];

const buildPath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const readFixture = (fixtureName) => {
  const fixturePath = buildPath(fixtureName);
  const fixtureContent = fs.readFileSync(fixturePath, 'utf-8').trim();
  return fixtureContent;
};

test.each(dataTypes)('testing another data type', (dataType) => {
  const before = buildPath(`before.${dataType}`);
  const after = buildPath(`after.${dataType}`);
  const fixtureTreeOutput = readFixture('resultTree.txt');
  const fixturePlainOtput = readFixture('resultPlain.txt');
  const fixtureJsonOutput = readFixture('resultJSON.txt');

  expect(compare(before, after)).toEqual(fixtureTreeOutput);
  expect(compare(before, after, 'plain')).toEqual(fixturePlainOtput);
  expect(compare(before, after, 'json')).toEqual(fixtureJsonOutput);
});
