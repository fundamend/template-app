module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					// disallow all imports
					'*',
					// allow imports of adapters, use cases, and entities
					'!@template-app',
					'@template-app/*',
					'!@template-app/adapter-*',
					'!@template-app/use-case-*',
					'!@template-app/entity-*',
					// allow self-referencing imports of package.json
					'!@template-app/*/',
					'@template-app/*/*',
					'!@template-app/*/package.json'
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
