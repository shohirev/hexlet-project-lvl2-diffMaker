const renderToObject = (diff) => {
  const prefixMap = {
    common: '  ',
    deleted: '- ',
    added: '+ ',
    nestedObj: '  '
  };

  const objectTree = diff.reduce((acc, currentNode) => {
    let nodeName = currentNode['key'];
    let nodeContent = currentNode.hasOwnProperty('children') ?
                        renderToObject(currentNode['children']) :
                          currentNode['value'];
    
    switch (currentNode['type']) {
      case 'changed':
        acc[`${prefixMap['deleted']}${nodeName}`] = nodeContent;
        acc[`${prefixMap['added']}${nodeName}`] = currentNode['previousValue'];
        break;
      default:
        acc[`${prefixMap[currentNode['type']]}${nodeName}`] = nodeContent;
    }
    return acc;
  }, {});

  return objectTree;
};

const renderToJSON = (diff) => JSON.stringify(renderToObject(diff));

export default { renderToJSON };