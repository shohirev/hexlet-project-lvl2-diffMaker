import _ from 'lodash';

const stringify = (data, initIndent) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = _.keys(data);
  const internalIndent = `${initIndent}    `;

  const processedData = keys.reduce((acc, key) => {
    const value = stringify(data[key], internalIndent);
    acc.push(`${internalIndent}${key}: ${value}`);
    return acc;
  }, []).join('\n');

  return `{\n${processedData}\n${initIndent}}`;
};

const renderTree = (diffAST, startIndent = '') => {
  const indent = `${startIndent}    `;

  const tree = diffAST.reduce((accTree, node) => {
    const { type } = node;
    const nodeContent = _.has(node, 'value') ? stringify(node.value, indent) : node.children;

    if (type === 'added') {
      const { key } = node;
      accTree.push(`${indent.slice(2)}+ ${key}: ${nodeContent}`);
    }

    if (type === 'deleted') {
      const { key } = node;
      accTree.push(`${indent.slice(2)}- ${key}: ${nodeContent}`);
    }

    if (type === 'common') {
      const { key } = node;
      accTree.push(`${indent}${key}: ${nodeContent}`);
    }

    if (type === 'changed') {
      const { key } = node;
      const { previousValue } = node;
      accTree.push(`${indent.slice(2)}- ${key}: ${stringify(previousValue, indent)}`);
      accTree.push(`${indent.slice(2)}+ ${key}: ${nodeContent}`);
    }

    if (type === 'nestedNode') {
      const { key } = node;
      accTree.push(`${indent}${key}: ${renderTree(nodeContent, indent)}`);
    }

    return accTree;
  }, []).join('\n');

  return `{\n${tree}\n${startIndent}}`;
};

export default renderTree;
