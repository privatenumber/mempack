import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'postcss';

const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			postcssPresetEnv({
				stage: 0,
				preserve: false,
				browsers: ['last 2 versions', '> 5%'],
			}),
		],
	},
};

export default {
	module: {
		rules: [
			// TODO: This gets applied to all CSS, even css in node_modules
			{
				test: /\.css$/,
				oneOf: [
					// Matches `<style module>`
					{
						resourceQuery: /module/,
						use: [
							'vue-style-loader',
							{
								loader: 'css-loader',
								options: {
									import: false,
									importLoaders: 1,
									modules: {
										localIdentName: '[local]_[hash:base64:5]',
									},
								},
							},
							postcssLoader,
						],
					},

					// Matches plain `<style>` or `<style scoped>`
					{
						use: [
							'vue-style-loader',
							{
								loader: 'css-loader',
								options: {
									import: false,
									importLoaders: 1,
								},
							},
							postcssLoader,
						],
					},
				],
			},
		],
	},
};
