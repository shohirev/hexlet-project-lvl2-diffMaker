import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import differ from './differ.js';
import render from './render.js';

const compare = (obj1, obj2) => {
	const unitedObj = {...obj1, ...obj2};
	const keys = Object.keys(unitedObj);
	return keys.reduce((acc, key) => {
		const currentValue = unitedObj[key];
		if (!_.has(obj1, key)) {
			return acc.concat(`+ ${key}: ${currentValue}\n`);
		}
		if (!_.has(obj2, key)) {
			return acc.concat(`- ${key}: ${currentValue}\n`);
		}
		if (obj1[key] === obj2[key]) {
			return acc.concat(`  ${key}: ${currentValue}\n`);
		}
		return acc.concat(`+ ${key}: ${currentValue}\n- ${key}: ${obj1[key]}\n`);
	}, '');
};

export default (file1, file2) => {
	const parsedFile1 = parse(file1);
	const parsedFile2 = parse(file2);
	return render(differ(parsedFile1, parsedFile2));
};