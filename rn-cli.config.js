// rn-cli.config.js
// module.exports = {
//     resolver: {
//       extraNodeModules: require('node-libs-react-native'),
//     },
//   };

const babelTransformer = require('./babel-transformer');

module.exports.transform = function (src, filename, options) {

	const extension = String(filename.slice(filename.lastIndexOf('.')));
	let result;

	try {

		result = babelTransformer(src, filename);

	} catch (e) {

		throw new Error(e);
		return;
	}

	return {
		ast: result.ast,
		code: result.code,
		map: result.map,
		filename
	};
};