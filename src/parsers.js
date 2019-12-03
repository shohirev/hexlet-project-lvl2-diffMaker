import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getFileType = file => path.extname(`${file}`);

const parser = (file) => {
	const extension = getFileType(file);
	let parsedFile;
	switch (extension) {
		case '.json':
		parsedFile = JSON.parse(fs.readFileSync(`${file}`, 'utf-8'));
		break;
		case '.yml':
		parsedFile = yaml.safeLoad(fs.readFileSync(`${file}`, 'utf-8'));
		break;
		case '.ini':
		parsedFile = ini.parse(fs.readFileSync(`${file}`, 'utf-8'));
		break;
	}
	return parsedFile;
};

export default parser;