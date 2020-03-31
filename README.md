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

		// merge is webpack-merge
		config: (config, merge) => merge.smart(config, { ... }),
	});
})();
```

