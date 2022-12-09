module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					// disallow all imports
					'*',
					// allow imports of svelte
					'!svelte',
					'!$app',
					'!$app/*',
					// allow imports of services, use cases, and entities
					'!@template-app',
					'@template-app/*',
					'!@template-app/service-*',
					'!@template-app/use-case-*',
					'!@template-app/entity-*',
					// allow self-referencing imports of package.json
					'!@template-app/*/',
					'@template-app/*/*',
					'!@template-app/*/package.json',
					// allow self-referencing imports of src files like layouts layouts
					'!@template-app/*/src',
					'!@template-app/*/src/*',
					'!@template-app/*/src/*/*'
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
