import tree from './renderTree.js';
import plain from './renderPlain.js';
import json from './renderJSON.js';

const renders = { tree, plain, json };

export default (diff, format) => renders[format](diff);