/*
 ** Allow only dependencies on adapters, use cases, and entities for all drivers
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
