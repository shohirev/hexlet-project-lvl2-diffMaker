import _ from 'lodash';

const getDescription = (nodeValue) => {
  const valueDescription = _.isObject(nodeValue) ? '[complex value]' : nodeValue;
  return valueDescription;
};

const renderToPlain = (diff, currentNodePath = '') => {
  const output = diff.map((node) => {
    const { key } = node;
    const { type } = node;

    switch (type) {
      case 'changed': {
        const previousValueDescription = getDescription(node.previousValue);
        const currentValueDescription = getDescription(node.currentValue);
        return `Property '${currentNodePath}${key}' was changed from ${previousValueDescription} to ${currentValueDescription}`;
      }
      case 'added':
        return `Property '${currentNodePath}${key}' was added with value: ${getDescription(node.value)}`;
      case 'deleted':
        return `Property '${currentNodePath}${key}' was deleted`;
      case 'nestedNode': {
        const nodeChildrenPath = `${currentNodePath}${key}.`;
        return renderToPlain(node.children, nodeChildrenPath);
      }
      case 'common':
        return '';
      default:
        throw new Error(`Error! ${type} is invalid node type!`);
    }
  })
    .filter((outputLine) => outputLine.length > 0)
    .join('\n');

  return output;
};

export default renderToPlain;
