const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
const postcssPresetEnv = require('postcss-preset-env');

const config = {
	plugins: [
		postcssJitProps({
			...OpenProps,
			layer: 'design',
		}),
		postcssPresetEnv,
	],
};

module.exports = config;
