const renderToPlain = (diff, path = '') => {
  const finalizeStr = (node) => {
    let value = `'${node['value']}'`;
    if (typeof (node['value']) === 'object' && node['value'] !== null) {
      value = '[complex value]';
    }

    let previousValue = `'${node['previousValue']}'`;
    if (typeof (node['previousValue']) === 'object' && node['previousValue'] !== null) {
      previousValue = '[complex value]';
    }

    if (node['type'] === 'added') {
      return `was added with value: ${value}`;
    }
    if (node['type'] === 'deleted') {
      return 'was deleted';
    }
    return `was changed from ${previousValue} to ${value}`;
  };

  const neededType = ['changed', 'added', 'deleted'];

  const result = diff.reduce((acc, node) => {
    const nodeType = node['type'];
    if (neededType.includes(nodeType)) {
      acc += `\nProperty '${path.concat(`${node['key']}`)}' ${finalizeStr(node)}`;
      return acc;
    }
    if (node['type'] === 'nestedObj') {
      acc += `\n${renderToPlain(node['children'], path.concat(`${node['key']}.`))}`;
      return acc;
    }
    return acc;
  }, '');

  return result.slice(1);
};

export default renderToPlain;