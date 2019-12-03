const getDiff = (obj1, obj2) => {
  const mergedObj = { ...obj1, ...obj2 };

  const keys = Object.keys(mergedObj);

  const resultData = keys.map((key) => {

    const node = { name: key };

    if (obj1[key] === undefined) {
      node.type = 'added';
    } else if (obj2[key] === undefined) {
      node.type = 'removed';
    } else if (obj1[key] === obj2[key]) {
      node.type = 'common';
    } else if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      node.type = 'common';
    } else {
      node.type = 'changed';
      node.previousValue = obj1[key];
    }

    if ((typeof obj1[key] === 'object') && (typeof obj2[key] === 'object')) {
      node.children = getDiff(obj1[key], obj2[key]);
    } else {
      node.value = mergedObj[key];
    }

    return node;
  });
  
  return resultData;
};

export default getDiff;