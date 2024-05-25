import svelte from 'eslint-plugin-svelte';
import typescript from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import js from '@eslint/js';

import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

/** @type {import("eslint").FlatConfig} */
const config = [
	{
		ignores: [
			'$houdini',
			'schema.graphql',
			'build',
			'node_modules',
			'.svelte-kit',
			'package',
			'yarn.lock',
			'pnpm-lock.yaml',
			'package-lock.json',
			'static/~partytown',
		],
	},
	js.configs.recommended,
	...typescript.configs.recommended,
	...svelte.configs['flat/prettier'],
	prettierConfig,
	{
		files: ['**/*.svelte'],
		rules: {
			'svelte/no-at-html-tags': 'warn',
		},
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node, ...globals.browser },
			parser: svelteParser,
			parserOptions: {
				parser: typescript.parser,
			},
		},
	},
];

export default config;
