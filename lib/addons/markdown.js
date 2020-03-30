export default {
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					require.resolve('vue-loader'),
					require.resolve('mdvue-loader'),
				],
			},
		],
	},
};
