export default {
	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: '[path][name].[ext]',
					emitFile: false,
				},
			},
		],
	},
};
