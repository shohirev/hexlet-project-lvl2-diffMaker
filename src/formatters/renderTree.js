export default (diff) => {
  const stringify = (data) => {
    if (typeof(data) === 'object' && data !== null) {
      const processedProps = Object.keys(data).reduce((acc, key) => {
        acc += `${key}: ${stringify(data[key])}`;
        return acc;
      }, '');
      return `{\n  ${processedProps}\n}`;
    }
    return data;
  };

  const buildTree = (diff) => {
    const prefixMap = {
      common: ' ',
      deleted: '-',
      added: '+'
    };

    const tree = diff.reduce((acc, node) => {
      const value = stringify(node['value']);
      const previousValue = stringify(node['previousValue']);

      if (node['type'] === 'changed') {
        acc += `\n${prefixMap['deleted']} ${node['key']}: ${previousValue}`;
        acc += `\n${prefixMap['added']} ${node['key']}: ${value}`;
      } else if (node['type'] === 'nestedObj') {
        const key = `\n${prefixMap['common']} ${node['key']}`;
        const children = buildTree(node['children']);
        acc += `${key}: {${children}\n}`;
      } else {
        acc += `\n${prefixMap[node['type']]} ${node['key']}: ${value}`;
      }

      return acc;
    }, '');

    return tree;
  };

  const addIndent = (tree) => {
  const splitted = tree.split('\n');
  let indent = '';
  for (let i = 1; i < splitted.length - 1; i += 1) {
    const previousStr = splitted[i - 1];
    const currentStr = splitted[i];
    if (previousStr.endsWith('{')) {
      indent = indent.concat('    ');
    }
    splitted[i] = `${indent}${currentStr}`;
    if (currentStr.endsWith('}')) {
      splitted[i] = `${indent.slice(2)}${currentStr}`;
      indent = indent.slice(4);
    }
  }
  return splitted.join('\n');
};

  const result = addIndent(`{${buildTree(diff)}\n}`);
  return result;
};