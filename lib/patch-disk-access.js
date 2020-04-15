import fs from 'fs';

// RE: unionfs https://github.com/streamich/unionfs/issues/288
function patchDiskAccess({ fs: _fs, dir, proxy }) {
	['stat', 'readFile', 'readlink'].forEach((method) => {
		const fn = _fs[method];

		// eslint-disable-next-line no-param-reassign
		_fs[method] = (...args) => {
			const [reqPath] = args;
			const inCwd = reqPath.startsWith(dir);

			if (inCwd) {
				return fs[method](...args);
			}

			if (typeof proxy === 'function') {
				proxy({ fs: _fs, reqPath });
			}

			return fn.apply(_fs, args);
		};
	});
}

export default patchDiskAccess;
