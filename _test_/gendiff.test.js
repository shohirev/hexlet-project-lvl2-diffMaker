import differ from '../src';

const result = `{
    common: {
      setting1: Value 1
    - setting2: 200
    + setting3: {
      key: value
    }
    - setting3: true
      setting6: {
        key: value
      + ops: vops
    }
    + follow: false
    + setting4: blah blah
    + setting5: {
      key5: value5
    }
  }
    group1: {
    + baz: bars
    - baz: bas
      foo: bar
    + nest: str
    - nest: {
      key: value
    }
  }
  - group2: {
    abc: 12345
  }
  + group3: {
    fee: 100500
  }
}`;

test('get diff of JSON', () => {;
	const before = `./_test_/_fixtures_/before.json`;
	const after = `./_test_/_fixtures_/after.json`;
	expect(differ(before, after)).toEqual(result);
});

test('get diff of YAML', () => {
	const before = `./_test_/_fixtures_/before.yml`;
	const after = `./_test_/_fixtures_/after.yml`;
	expect(differ(before, after)).toEqual(result);
});

test('get diff of INI', () => {
	const before = `./_test_/_fixtures_/before.ini`;
	const after = `./_test_/_fixtures_/after.ini`;
	expect(differ(before, after)).toEqual(result);
});