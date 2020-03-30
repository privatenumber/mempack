export default {
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
				},
			},
		],
	},
};
