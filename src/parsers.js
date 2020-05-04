import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, sourceFileType) => {
	switch (sourceFileType) {
		case 'json':
		return JSON.parse(data);
		break;
		case 'yml':
		return yaml.safeLoad(data);
		break;
		case 'ini':
		return ini.parse(data);
		break;
	}
};

export default parse;