import _ from 'lodash';

const render = (diff) => {
  const stringify = (data) => {
    if (_.isObject(data)) {
      const processedData = _.keys(data).reduce((acc, key) => {
        let currentAcc = `${acc}`;
        currentAcc += `${key}: ${stringify(data[key])}\n  `;
        return currentAcc;
      }, '');
      return `{\n  ${processedData.trim()}\n}`;
    }
    return data;
  };

  const buildTree = (diffAST) => {
    const prefixMap = {
      common: '  ',
      deleted: '- ',
      added: '+ ',
      nestedObj: '  ',
    };

    const tree = diffAST.reduce((accTree, node) => {
      const { nodeType } = node;
      const nodeContent = _.has(node, 'nodeValue') ? node.nodeValue : node.children;
      let currentAccTree = `${accTree}`;

      if (nodeType === 'added' || nodeType === 'deleted' || nodeType === 'common') {
        const { key } = node;
        const prefix = prefixMap[nodeType];
        currentAccTree += `\n${prefix}${key}: ${stringify(nodeContent)}`;
      }

      if (nodeType === 'changed') {
        const { key } = node;
        const { previousValue } = node;
        currentAccTree += `\n${prefixMap.deleted}${key}: ${stringify(previousValue)}`;
        currentAccTree += `\n${prefixMap.added}${key}: ${stringify(nodeContent)}`;
      }

      if (nodeType === 'nestedObj') {
        const prefix = prefixMap[nodeType];
        const { key } = node;
        currentAccTree += `\n${prefix}${key}: {\n${buildTree(nodeContent)}\n}`;
      }

      return currentAccTree;
    }, '').slice(1);

    return tree;
  };

  const normalize = (tree) => {
    const splittedTree = tree.split('\n');
    let indent = '  ';
    const normalizedTree = splittedTree.map((currentLine) => {
      let lineWithIndent;
      if (currentLine.endsWith('{')) {
        lineWithIndent = `${indent}${currentLine}`;
        indent += '    ';
        return lineWithIndent;
      }
      if (currentLine.endsWith('}')) {
        indent = indent.slice(0, -2);
        lineWithIndent = `${indent}${currentLine}`;
        indent = indent.slice(0, -2);
        return lineWithIndent;
      }
      lineWithIndent = `${indent}${currentLine}`;
      return lineWithIndent;
    }).join('\n');

    const wrappedTree = `{\n${normalizedTree}\n}`;
    return wrappedTree;
  };

  return normalize(buildTree(diff));
};

export default render;
