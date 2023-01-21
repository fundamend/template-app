module.exports = {
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					// disallow relative imports
					'**/../*'
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
