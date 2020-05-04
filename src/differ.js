import _ from 'lodash';

const buildDiff = (dataBefore, dataAfter) => {

  const mergedKeysList = _.union(_.keys(dataBefore), _.keys(dataAfter)).sort();

  const diff = mergedKeysList.map((key) => {
    if (!_.has(dataBefore, key)) {
      return {
        key,
        nodeType: 'added',
        nodeValue: dataAfter[key],
      };
    }

    if (!_.has(dataAfter, key)) {
      return {
        key,
        nodeType: 'deleted',
        nodeValue: dataBefore[key],
      };
    }

    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return {
        key,
        nodeType: 'nestedObj',
        children: buildDiff(valueBefore, valueAfter),
      }
    }

    if (valueBefore === valueAfter) {
      return {
        key,
        nodeType: 'common',
        nodeValue: valueBefore,
      }
    }

    return {
      key,
      nodeType: 'changed',
      nodeValue: valueAfter,
      previousValue: valueBefore,
    }
  });

  return diff;
};

export default buildDiff;