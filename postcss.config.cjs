const autoprefixer = require('autoprefixer');
const postcssCustomMedia = require('postcss-custom-media');
const postcssNesting = require('postcss-nesting');

const config = {
	plugins: [postcssCustomMedia, postcssNesting, autoprefixer],
};

module.exports = config;
