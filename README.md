# mempack
> Run a Webpack build in-memory

## Install
```
$ npm install mempack
```

## Usage

```js
const mempack = require('mempack');

(async () => {
	const built = await mempack({
		files: [
			// Entry point
			{
				name: 'index.js',
				content: `
				import string from './string.js';

				console.log(string);
				`,
			},
			{
				name: 'string.js',
				content: `
				export default 'hello world';
				`
			},
		],

		// Configure webpack
		config: ({ config, addons merge }) =>

			addons(config, ['babel', 'vue']), // for adding Babel and Vue (from in lib/addons)

			merge.smart(config, { ... }), // ... or use webpack-merge

	});
})();
```

## License
MIT