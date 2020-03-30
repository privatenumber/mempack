import merge from 'webpack-merge';

const applyAddons = (config, addons) => merge(
	...addons.map((configPath) => require(`./${configPath}`).default),
	config,
);

export default applyAddons;
