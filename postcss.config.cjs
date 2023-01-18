const autoprefixer = require('autoprefixer');
const postcssCustomMedia = require('postcss-custom-media');

const config = {
	plugins: [
		postcssCustomMedia,
		autoprefixer,
	],
};

module.exports = config;
