const filesObj = (files) => files
	.reduce(
		(obj, { name, content }) => Object.assign(obj, { [`/src/${name}`]: content }),
		{},
	);

export default filesObj;
