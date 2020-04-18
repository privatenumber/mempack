import nodeModulesPath from './utils/node-modules-path';

export default {
	mode: 'production',
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
		/^\w/, // Externalize all modules
		// ({ request }, callback) => callback(null, /^\w/.test(request) && request),
	],
	optimization: {
		// Too slow
		minimize: false,

		// https://github.com/webpack/webpack/issues/10347#issuecomment-598054933
		usedExports: false,
	},
};
