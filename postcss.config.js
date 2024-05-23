import autoprefixer from 'autoprefixer';
import postcssNesting from 'postcss-nesting';
import postcssCustomMedia from 'postcss-custom-media';

const config = {
	plugins: [postcssCustomMedia, postcssNesting, autoprefixer],
};

export default config;
