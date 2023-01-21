module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					// disallow relative imports
					'**/../*',
					// allow imports of abstracts, services, use cases, and entities
					'@template-app/*',
					'!@template-app/abstract-*',
					'!@template-app/entity-*',
					'!@template-app/service-*',
					'!@template-app/use-cases'
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
