const renderJSON = (diff) => {
  const prefixMap = {
    common: '  ',
    deleted: '- ',
    added: '+ ',
    nestedObj: '  '
  };

  const tree = diff.reduce((acc, currentNode) => {
    let nodeName = currentNode['key'];
    let nodeContent = currentNode.hasOwnProperty('children') ?
                        renderJSON(currentNode['children']) :
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

  return tree;
};

export default (diff) => JSON.stringify(renderJSON(diff), null, 4);