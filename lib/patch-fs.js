import path from 'path';

function patchFS({ compiler, fs }) {
	// From webpack/lib/node/NodeOutputFileSystem.js
	if (!fs.join) {
		fs.join = path.join.bind(path);
	}

	compiler.inputFileSystem = fs;
	compiler.outputFileSystem = fs;
}

export default patchFS;
