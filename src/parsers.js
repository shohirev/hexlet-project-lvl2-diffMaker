import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, dataType) => {
  let parsedData;

  if (dataType === 'json') {
    parsedData = JSON.parse(data);
  }

  if (dataType === 'yml') {
    parsedData = yaml.safeLoad(data);
  }

  if (dataType === 'ini') {
    parsedData = ini.parse(data);
  }

  return parsedData;
};

export default parse;
