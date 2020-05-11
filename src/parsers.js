import yaml from 'js-yaml';
import ini from 'ini';

const parse = (data, dataType) => {
  const parserMap = {
    json: JSON.parse,
    yml: yaml.safeLoad,
    ini: ini.parse,

    getParser(parsingDataType) {
      return this[parsingDataType];
    },
  };

  const parsedData = parserMap.getParser(dataType)(data);

  return parsedData;
};

export default parse;
