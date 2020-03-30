import path from 'path';
import applyAddons from './addons';
import nodeModulesPath from './utils/node-modules-path';

export default applyAddons({
	mode: 'production',
	// devtool: 'none',
	context: '/src',
	entry: './index.js',
	output: {
		filename: '[name].js',
		path: '/dist',
		libraryTarget: 'amd',
	},
	resolve: {
		modules: [nodeModulesPath],
	},
	resolveLoader: {
		modules: [nodeModulesPath],
	},
	externals: [
		({ request }, callback) => callback(null, /^\w/.test(request) && request),
	],
	optimization: {
		// Too slow
		minimize: false,

		// https://github.com/webpack/webpack/issues/10347#issuecomment-598054933
		usedExports: false,
	},
}, ['babel', 'svg', 'css', 'vue', 'markdown']);
