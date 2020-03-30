import fs from 'fs';

// RE: unionfs https://github.com/streamich/unionfs/issues/288
function patchDiskAccess({ fs: _fs, dir }) {
	['stat', 'readFile', 'readlink'].forEach((method) => {
		const fn = _fs[method];

		_fs[method] = (...args) => {
			const [reqPath] = args;
			const inCwd = reqPath.startsWith(dir);

			if (inCwd) {
				return fs[method].apply(fs, args);
			}

			return fn.apply(_fs, args);
		};
	});
}

export default patchDiskAccess;
