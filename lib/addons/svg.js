export default {
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: require.resolve('url-loader'),
				options: {
					limit: 100000,
				},
			},
		],
	},
};
