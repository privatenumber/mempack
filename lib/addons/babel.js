export default (opts) => ({
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: '/src',
				options: {
					presets: [
						require.resolve('@babel/preset-env'),
					],
					// plugins: [
					// 	require.resolve('babel-plugin-transform-vue-jsx'),
					// ],
				},
				...opts,
			},
		],
	},
});
