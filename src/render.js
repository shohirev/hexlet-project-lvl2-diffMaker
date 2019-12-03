const render = (tree) => {
  const renderedTree = tree.reduce((acc, node) => {
    let data;
    if (node.hasOwnProperty('value')) {
      data = node.value;
    } else {
      data = render(node.children);
    };
    switch (node.type) {
      case 'common': acc[`  ${node.name}`] = data;
        break;
      case 'added': acc[`+ ${node.name}`] = data;
        break;
      case 'removed': acc[`- ${node.name}`] = data;
        break;
      case 'changed':
        acc[`+ ${node.name}`] = data;
        acc[`- ${node.name}`] = node.previousValue;
    };
    return acc;
}, {});
return renderedTree;
};

const format = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] !== '"' && string[i] !== ',') {
      result = result + string[i];
    } 
  };
  return result;
};

export default (tree) => format(JSON.stringify(render(tree), null, '  '));