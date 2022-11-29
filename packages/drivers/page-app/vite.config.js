import { sveltekit } from '@sveltejs/kit/vite'; // eslint-disable-line no-restricted-imports

const config = {
	plugins: [sveltekit()],
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
	},
	build: {
		sourcemap: true
	},
	envPrefix: 'PUBLIC_'
};

export default config;
