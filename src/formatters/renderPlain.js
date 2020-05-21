import _ from 'lodash';

const describe = (node) => {
  const { type } = node;
  const valueDescription = _.isObject(node.value) ? '[complex value]' : node.value;
  let nodeDescription;

  if (type === 'changed') {
    const previousValueDescription = _.isObject(node.previousValue) ? '[complex value]' : node.previousValue;
    nodeDescription = `was changed from ${previousValueDescription} to ${valueDescription}`;
  }

  if (type === 'added') {
    nodeDescription = `was added with value: ${valueDescription}`;
  }

  if (type === 'deleted') {
    nodeDescription = 'was deleted';
  }

  return nodeDescription;
};

const renderToPlain = (diff, currentNodePath = '') => {
  const displayedTypes = ['changed', 'added', 'deleted'];

  const resultOutput = diff.reduce((outputAcc, node) => {
    const { key } = node;
    const description = describe(node);

    if (_.includes(displayedTypes, node.type)) {
      outputAcc.push(`Property '${currentNodePath}${key}' ${description}`);
      return outputAcc;
    }

    if (node.type === 'nestedNode') {
      const { children } = node;
      const childrenNodePath = `${currentNodePath}${key}.`;
      outputAcc.push(renderToPlain(children, childrenNodePath));
      return outputAcc;
    }

    return outputAcc;
  }, []).join('\n');

  return resultOutput;
};

export default renderToPlain;
