/* TODO: import config-eslint
const fundamend = require('@fundamend/config-eslint');

module.exports = {
	...fundamend
};
*/

module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier', 'plugin:astro/recommended'],
	plugins: ['svelte3'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		{ files: ['*.astro'], parser: 'astro-eslint-parser' }
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
