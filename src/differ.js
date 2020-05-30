import _ from 'lodash';

const buildDiff = (dataBefore, dataAfter) => {
  const keys = _.union(_.keys(dataBefore), _.keys(dataAfter)).sort();

  const diff = keys.map((key) => {
    if (!_.has(dataBefore, key)) {
      return {
        key,
        type: 'added',
        value: dataAfter[key],
      };
    }

    if (!_.has(dataAfter, key)) {
      return {
        key,
        type: 'deleted',
        value: dataBefore[key],
      };
    }

    const valueBefore = dataBefore[key];
    const valueAfter = dataAfter[key];

    if (_.isObject(valueBefore) && _.isObject(valueAfter)) {
      return {
        key,
        type: 'nestedNode',
        children: buildDiff(valueBefore, valueAfter),
      };
    }

    if (valueBefore === valueAfter) {
      return {
        key,
        type: 'common',
        value: valueBefore,
      };
    }

    return {
      key,
      type: 'changed',
      currentValue: valueAfter,
      previousValue: valueBefore,
    };
  });

  return diff;
};

export default buildDiff;
