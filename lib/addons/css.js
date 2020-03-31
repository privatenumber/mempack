// import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'postcss';

const parseQuoted = (str) => str.match(/^(['"])(.+)\1$/)[2];

const importAlias = postcss.plugin(
	'postcss-import-alias',
	(alias) => (css) => {
		css.walkAtRules('import', (rule) => {
			const resolved = Object.entries(alias)
					.reduce(
						(req, [key, val]) => req.replace(new RegExp(`^${key}`), val),
						parseQuoted(rule.params),
					);

			rule.params = `"${resolved}"`; // eslint-disable-line no-param-reassign
		});
	},
);

const alias = {
	// 'alias': 'URL'
};

const cssLoaderConfig = (opts = {}) => ({
	use: [
		'vue-style-loader',
		{
			loader: 'css-loader',
			options: {
				import: false,
				importLoaders: 1,
				...opts,
			},
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: () => [
					importAlias(alias),
					postcssPresetEnv({
						stage: 0,
						preserve: false,
						browsers: ['last 2 versions', '> 5%'],
					}),
				],
			},
		},
	],
});

export function setAlias(aliases = {}) {
	Object.assign(alias, aliases);
	return function clear() {
		Object.keys(aliases).forEach((key) => {
			delete alias[key];
		});
	};
}

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
						...cssLoaderConfig({
							modules: {
								localIdentName: '[local]_[hash:base64:5]',
							},
						}),
					},

					// Matches plain `<style>` or `<style scoped>`
					cssLoaderConfig(),
				],
			},
		],
	},
};
