/*
 ** Allow only dependencies on external modules, or abstracts, other adapters, use cases, and entities for all adapters
 */
module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'**/../*',
					'@template-app/*',
					'!@template-app/abstract-*',
					'!@template-app/adapter-*',
					'!@template-app/use-case-*',
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
