import VueLoaderPlugin from 'vue-loader/lib/plugin-webpack5';
import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'postcss';

const postcssLoader = (pluginsFn = (p => p)) => ({
	loader: 'postcss-loader',
	options: {
		plugins: pluginsFn([
			postcssPresetEnv({
				stage: 0,
				preserve: false,
				browsers: ['last 2 versions', '> 5%'],
			}),
		]),
	},
});

export default (opts = {}) => ({
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: opts.vue || {},
			},
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
							postcssLoader(opts.css && opts.css.postcssPlugins),
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
							postcssLoader(opts.css && opts.css.postcssPlugins),
						],
					},
				],
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
	],
});
