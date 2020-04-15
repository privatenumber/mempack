export default (options = {}) => ({
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					// Configure in vue.js
					'vue-loader',
					{
						loader: 'md-vue-loader',
						options,
					},
				],
			},
		],
	},
});
