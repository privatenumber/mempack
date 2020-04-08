export default {
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					{
						loader: 'vue-loader',
					},
					{
						loader: 'md-vue-loader',
					},
				],
			},
		],
	},
};
