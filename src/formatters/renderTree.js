import _ from 'lodash';

const stringify = (data, initIndent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = _.keys(data);
  const internalIndent = `${initIndent}    `;

  const processedData = keys.map((key) => {
    const valueByKey = stringify(data[key], internalIndent);
    return `${internalIndent}${key}: ${valueByKey}`;
  }).join('\n');

  return `{\n${processedData}\n${initIndent}}`;
};

const renderTree = (diff, startIndent = '') => {
  const indent = `${startIndent}    `;

  const outputTree = diff.map((node) => {
    const { type, key } = node;

    switch (type) {
      case 'added':
        return `${indent.slice(2)}+ ${key}: ${stringify(node.value, indent)}`;
      case 'deleted':
        return `${indent.slice(2)}- ${key}: ${stringify(node.value, indent)}`;
      case 'common':
        return `${indent}${key}: ${stringify(node.value, indent)}`;
      case 'changed': {
        const { currentValue, previousValue } = node;
        const beforeDescription = `${indent.slice(2)}- ${key}: ${stringify(previousValue, indent)}`;
        const afterDescription = `${indent.slice(2)}+ ${key}: ${stringify(currentValue, indent)}`;
        return `${beforeDescription}\n${afterDescription}`;
      }
      case 'nestedNode':
        return `${indent}${key}: ${renderTree(node.children, indent)}`;
      default:
        throw new Error(`Error! ${type} is invalid node type!`);
    }
  }).join('\n');

  return `{\n${outputTree}\n${startIndent}}`;
};

export default renderTree;
