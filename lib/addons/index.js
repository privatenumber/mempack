import merge from 'webpack-merge';

const applyAddons = (config, addons) => merge(
	config,
	...addons.map((addon) => {
		const [addonName, addonOpts] = Array.isArray(addon) ? addon : [addon];
		const addonFn = require(`./${addonName}`).default; // eslint-disable-line
		return addonFn(addonOpts);
	}),
);

export default applyAddons;
