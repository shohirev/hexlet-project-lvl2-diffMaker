import _ from 'lodash';

const renderToPlain = (diff, currentNodePath = '') => {
  const describe = (node) => {
    const { nodeType } = node;
    const valueDecription = _.isObject(node.nodeValue) ? '[complex value]' : node.nodeValue;
    let nodeDescription;

    if (nodeType === 'changed') {
      const previousValueDescription = _.isObject(node.previousValue) ? '[complex value]' : node.previousValue;
      nodeDescription = `was changed from ${previousValueDescription} to ${valueDecription}`;
    }

    if (nodeType === 'added') {
      nodeDescription = `was added with value: ${valueDecription}`;
    }

    if (nodeType === 'deleted') {
      nodeDescription = 'was deleted';
    }

    return nodeDescription;
  };

  const displayedTypes = ['changed', 'added', 'deleted'];

  const resultOutput = diff.reduce((outputAcc, node) => {
    const { nodeType } = node;
    let currentStepOutput = `${outputAcc}`;

    if (_.includes(displayedTypes, nodeType)) {
      currentStepOutput += `\nProperty '${currentNodePath}${node.key}' ${describe(node)}`;
      return currentStepOutput;
    }
    if (nodeType === 'nestedObj') {
      currentStepOutput += `\n${renderToPlain(node.children, `${currentNodePath}${node.key}.`)}`;
      return currentStepOutput;
    }
    return currentStepOutput;
  }, '').trim();

  return resultOutput;
};

export default renderToPlain;
