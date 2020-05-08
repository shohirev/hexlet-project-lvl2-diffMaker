import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, dataType) => {
  switch (dataType) {
    case 'json':
    return JSON.parse(data);
    case 'yml':
    return yaml.safeLoad(data);
    case 'ini':
    return ini.parse(data);
  }
};

export default parse;