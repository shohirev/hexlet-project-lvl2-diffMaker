import _ from 'lodash';

const renderToPlain = (diff, currentNodePath = '') => {
  const describe = (node) => {
    const { nodeType } = node;
    const valueDecription = _.isObject(node.nodeValue) ? '[complex value]' : node.nodeValue;

    if (nodeType === 'changed') {
      const previousValueDescription = _.isObject(node.previousValue) ? '[complex value]' : node.previousValue;
      return `was changed from ${previousValueDescription} to ${valueDecription}`;
    }

    if (nodeType === 'added') {
      return `was added with value: ${valueDecription}`;
    }

    if (nodeType === 'deleted') {
      return 'was deleted';
    }
  };

  const displayedTypes = ['changed', 'added', 'deleted'];

  const resultOutput = diff.reduce((acc, node) => {
    const { nodeType } = node;
    if (displayedTypes.includes(nodeType)) {
      acc += `\nProperty '${currentNodePath}${node.key}' ${describe(node)}`;
      return acc;
    }
    if (nodeType === 'nestedObj') {
      acc += `\n${renderToPlain(node.children, `${currentNodePath}${node.key}.`)}`;
      return acc;
    }
    return acc;
  }, '').trim();

  return resultOutput;
};

export default renderToPlain;