module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					// disallow all imports
					'*',
					// disallow relative imports
					'**/../*',
					// allow imports of svelte files
					'!svelte',
					'!$app',
					'!$app/*',
					'!$lib',
					'!$lib/*',
					'!$lib/*/*',
					// allow imports of services, shared, use cases, and entities
					'!@template-app',
					'@template-app/*',
					'!@template-app/entity-*',
					'!@template-app/service-*',
					'!@template-app/shared-*',
					'!@template-app/use-cases',
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
