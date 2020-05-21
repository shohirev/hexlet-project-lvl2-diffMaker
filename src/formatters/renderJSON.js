import _ from 'lodash';

const renderToObject = (diff) => {
  const prefixMap = {
    common: '  ',
    deleted: '- ',
    added: '+ ',
    nestedNode: '  ',
  };

  const resultObjTree = diff.reduce((tree, node) => {
    const { key, type } = node;
    const nodeContent = _.has(node, 'children') ? renderToObject(node.children) : node.value;

    if (type === 'changed') {
      const keyDeletedValue = `${prefixMap.deleted}${key}`;
      const keyAddedValue = `${prefixMap.added}${key}`;
      return {
        ...tree,
        [keyDeletedValue]: node.previousValue,
        [keyAddedValue]: nodeContent,
      };
    }

    const includedKey = `${prefixMap[type]}${key}`;
    return {
      ...tree,
      [includedKey]: nodeContent,
    };
  }, {});

  return resultObjTree;
};

const renderToJSON = (diff) => JSON.stringify(renderToObject(diff));

export default renderToJSON;
