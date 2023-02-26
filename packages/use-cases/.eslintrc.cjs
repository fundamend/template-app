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
					// allow imports of configs
					'!@fundamend',
					'@fundamend/*',
					'!@fundamend/config-*',
					// allow imports of  entities
					'!@template-app',
					'@template-app/*',
					'!@template-app/entities',
					// allow self-referencing imports of src files
					'!@template-app/use-cases',
					'@template-app/use-cases/*',
					'!@template-app/use-cases/src',
					'!@template-app/use-cases/src/*'
				]
			}
		]
	},
	overrides: [
		{
			files: ['*.test.js', '*.steps.js', 'features/support/*.js'],
			rules: { 'no-restricted-imports': 0 }
		}
	]
};
