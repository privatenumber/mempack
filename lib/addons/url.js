export default (opts = {}) => ({
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif|svg)$/i,
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: '[path][name].[ext]',
					emitFile: false,
				},
				...opts,
			},
		],
	},
});
