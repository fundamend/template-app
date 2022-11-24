/*
 ** Allow no dependencies for all entities
 */
module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: ['**/../*', '*']
			}
		]
	},
	overrides: [
		{
			files: ['*.test.js', '*.steps.js'],
			rules: {
				'no-restricted-imports': 0
			}
		}
	]
};
