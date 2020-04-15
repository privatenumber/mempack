import webpack from 'webpack';
import { Volume } from 'memfs';
import merge from 'webpack-merge';
import patchFs from './patch-fs';
import patchDiskAccess from './patch-disk-access';
import filesObj from './files-obj';
import wpConfigBase from './webpack.config';
import nodeModulesPath from './utils/node-modules-path';
import addons from './addons';

function mempack({ files, fsProxy, config }) {
	const fs = new Volume();

	patchDiskAccess({
		fs,
		dir: nodeModulesPath,
		proxy: fsProxy,
	});

	fs.fromJSON(filesObj(files));

	let wpConfig = merge({}, wpConfigBase);
	if (typeof config === 'function') {
		wpConfig = config({ config: wpConfig, addons, merge });
	}

	const compiler = webpack(wpConfig);
	patchFs({ compiler, fs });

	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			if (err) {
				reject(err);
				return;
			}

			if (stats.hasErrors()) {
				const info = stats.toJson();
				reject(info.errors);
				return;
			}

			if (stats.hasWarnings()) {
				const info = stats.toJson();
				console.log(info);
			}

			// TODO: Get path from config
			const built = fs.readFileSync('/dist/main.js').toString();
			resolve(built);
		});
	});
}

export default mempack;
