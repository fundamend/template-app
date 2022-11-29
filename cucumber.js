export default {
	paths: ['packages/**/*.feature'],
	import: ['packages/**/features/**/*.js', 'node-modules/vitest/dist/index.js'],
	publishQuiet: true
};
