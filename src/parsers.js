import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (file) => {
	switch (path.extname(`${file}`)) {
		case '.json':
		return JSON.parse(fs.readFileSync(`${file}`, 'utf-8'));
		break;
		case '.yml':
		return yaml.safeLoad(fs.readFileSync(`${file}`, 'utf-8'));
		break;
		case '.ini':
		return ini.parse(fs.readFileSync(`${file}`, 'utf-8'));
		break;
	}
};

export default parser;