import _ from 'lodash';

const renderToObject = (diff) => {
  const prefixMap = {
    common: '  ',
    deleted: '- ',
    added: '+ ',
    nestedObj: '  ',
  };

  const resultObjTree = diff.reduce((tree, node) => {
    const { key } = node;
    const { nodeType } = node;
    const nodeContent = _.has(node, 'children') ? renderToObject(node.children) : node.nodeValue;
    const processedObjTree = { ...tree };

    if (node.nodeType === 'changed') {
      const keyDeletedValue = `${prefixMap.deleted}${key}`;
      const keyAddedValue = `${prefixMap.added}${key}`;
      processedObjTree[keyDeletedValue] = node.previousValue;
      processedObjTree[keyAddedValue] = nodeContent;
    } else {
      const includedKey = `${prefixMap[nodeType]}${key}`;
      processedObjTree[includedKey] = nodeContent;
    }

    return processedObjTree;
  }, {});

  return resultObjTree;
};

const renderToJSON = (diff) => JSON.stringify(renderToObject(diff));

export default renderToJSON;
