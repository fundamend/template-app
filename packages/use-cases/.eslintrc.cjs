/*
 ** Allow only dependencies on entities for all use-cases
 */
module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'**/../*',
					'*',
					'!@template-app',
					'@template-app/*',
					'!@template-app/entity-*'
				]
			}
		]
	},
	overrides: [
		{
			files: ['*.test.js', '*.steps.js'],
			rules: { 'no-restricted-imports': 0 }
		}
	]
};
