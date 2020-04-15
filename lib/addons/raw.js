export default (opts = {}) => ({
	module: {
		rules: [
			{
				test: /\.txt$/,
				loader: 'raw-loader',
				...opts,
			},
		],
	},
});
