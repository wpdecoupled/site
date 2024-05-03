/** @type {import("prettier").Config} */
const config = {
	singleQuote: true,
	printWidth: 100,
	plugins: ['prettier-plugin-svelte'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};

export default config;
