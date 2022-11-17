/* TODO: import config-eslint
const fundamend = require('@fundamend/config-eslint');

module.exports = {
	...fundamend
};
*/

module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
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
