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
					// allow self-referencing imports of src files
					'!@template-app',
					'@template-app/*',
					'!@template-app/entities',
					'@template-app/entities/*',
					'!@template-app/entities/src',
					'!@template-app/entities/src/*'
				]
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
