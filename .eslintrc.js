module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'airbnb-base',
	],

	rules: {
		indent: 'off',
		'indent-legacy': ['error', 'tab'],
		'no-tabs': 'off',
	},

	overrides: [
		{
			files: ['*.spec.js'],
			env: {
				jest: true,
			},
		},
	],
};
