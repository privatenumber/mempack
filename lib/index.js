import webpack from 'webpack';
import path from 'path';
import { Volume } from 'memfs';
import merge from 'webpack-merge';
import patchFs from './patch-fs';
import patchDiskAccess from './patch-disk-access';
import filesObj from './files-obj';
import wpConfigBase from './webpack.config';
import nodeModulesPath from './utils/node-modules-path';
// import { setAlias } from './addons/css';

function mempack({ files, config/*, dependencies*/ }) {
	const fs = new Volume();

	patchDiskAccess({
		fs,
		dir: nodeModulesPath,
	});

	fs.fromJSON(filesObj(files));

	// const clearAliases = setAlias(dependencies);
	// building.$.then(clearAliases);

	let wpConfig = merge({}, wpConfigBase);
	if (typeof config === 'function') {
		wpConfig = config(wpConfig, merge);
	}

	const compiler = webpack(wpConfig);
	patchFs({ compiler, fs });

	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			if (err) {
				return reject(err);
			}

			if (stats.hasErrors()) {
				const info = stats.toJson();
				return reject(info.errors);
			}

			if (stats.hasWarnings()) {
				const info = stats.toJson();
			}

			// TODO: Get path from config
			const built = fs.readFileSync('/dist/main.js').toString();
			resolve(built);
		});
	});
}

export default mempack;
