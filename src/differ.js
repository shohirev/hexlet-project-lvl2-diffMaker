import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const mergedObj = { ...obj1, ...obj2 };

  return Object.keys(mergedObj).sort().map((key) => {
    const astNode = { key };

    astNode['type'] = 'common';
    if (obj1[key] !== obj2[key]) {
      astNode['type'] = 'changed';
    }
    if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object') {
      astNode['type'] = 'nestedObj';
    }
    if (!_.has(obj1, key)) {
      astNode['type'] = 'added';
    }
    if (!_.has(obj2, key)) {
      astNode['type'] = 'deleted';
    }

    if (astNode['type'] === 'changed') {
      astNode['previousValue'] = obj1[key];
    }

    if (astNode['type'] === 'nestedObj') {
      astNode['children'] = getDiff(obj1[key], obj2[key]);
    } else {
      astNode['value'] = mergedObj[key];
    }

    return astNode;
  });
};

export default getDiff;