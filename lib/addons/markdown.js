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
						loader: 'mdvue-loader',
					},
				],
			},
		],
	},
};
