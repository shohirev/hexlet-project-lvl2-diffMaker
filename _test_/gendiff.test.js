import differ from '../src';

test('get diff of JSON', () => {
	//console.log(_dirname);
	const before = `./_test_/_fixtures_/before.json`;
	const after = `./_test_/_fixtures_/after.json`;
	const result = "  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true\n";
	expect(differ(before, after)).toEqual(result);
});