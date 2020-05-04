import _ from 'lodash';

const renderToObject = (diff) => {
  const prefixMap = {
    common: '  ',
    deleted: '- ',
    added: '+ ',
    nestedObj: '  '
  };

  return diff.reduce((resultObjTree, node) => {
    const { key } = node;
    const { nodeType } = node;
    
    const nodeContent = _.has(node, 'children') ? renderToObject(node.children) : node.nodeValue;
    
    switch (node.nodeType) {
      case 'changed':
        resultObjTree[`${prefixMap['deleted']}${key}`] = node.previousValue;
        resultObjTree[`${prefixMap['added']}${key}`] = nodeContent;
        break;
      default:
        resultObjTree[`${prefixMap[nodeType]}${key}`] = nodeContent;
    }
    return resultObjTree;
  }, {});
};

const renderToJSON = (diff) => JSON.stringify(renderToObject(diff));

export default renderToJSON;