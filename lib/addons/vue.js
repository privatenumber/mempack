import VueLoaderPlugin from 'vue-loader/lib/plugin-webpack5';

export default {
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: require.resolve('vue-loader'),
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
	],
};
