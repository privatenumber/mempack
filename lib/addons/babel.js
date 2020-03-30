export default {
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: require.resolve('babel-loader'),
				include: '/src',
				options: {
					presets: [
						require.resolve('@babel/preset-env'),
					],
					// plugins: [
					// 	require.resolve('babel-plugin-transform-vue-jsx'),
					// ],
				},
			},
		],
	},
};
