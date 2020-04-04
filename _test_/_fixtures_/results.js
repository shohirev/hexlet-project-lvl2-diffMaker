import tree from './_examples_/resultTree.js';
import plain from './_examples_/resultPlain.js';
import JSON from './_examples_/resultJSON.js';
import JSONofINI from './_examples_/resultJSONofINI.js';

const results = { tree, plain, JSON, JSONofINI };

export default (format) => results[format](format);