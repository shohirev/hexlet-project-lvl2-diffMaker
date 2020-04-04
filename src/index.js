import parser from './parsers.js';
import differ from './differ.js';
import render from './formatters/index.js';

export default (file1, file2, format = 'tree') => {
	const parsedFile1 = parser(file1);
	const parsedFile2 = parser(file2);
	return render(differ(parsedFile1, parsedFile2), format);
};