import path from 'path';

function patchFS({ compiler, fs }) {
	// From webpack/lib/node/NodeOutputFileSystem.js
	if (!fs.join) {
		fs.join = path.join.bind(path); // eslint-disable-line no-param-reassign
	}

	compiler.inputFileSystem = fs; // eslint-disable-line no-param-reassign
	compiler.outputFileSystem = fs; // eslint-disable-line no-param-reassign
}

export default patchFS;
