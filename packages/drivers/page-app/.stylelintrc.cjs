const fundamend = require('@fundamend/config-stylelint');

module.exports = {
	...fundamend,
	rules: {
		'no-descending-specificity': null
	}
};
