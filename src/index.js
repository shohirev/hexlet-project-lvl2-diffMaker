import fs from 'fs';
import _ from 'lodash';

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

const differ = (filePath1, filePath2) => {
	const file1 = JSON.parse(fs.readFileSync(`${filePath1}`, 'utf-8'));
	const file2 = JSON.parse(fs.readFileSync(`${filePath2}`, 'utf-8'));
	return compare(file1, file2);
};

export default differ;