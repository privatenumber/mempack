import assert from 'assert';

const findNodeModules = require.resolve('webpack').match(/^.+node_modules/);
assert(findNodeModules, 'Couldn\'t find "node_modules" directory');

export default findNodeModules[0];
