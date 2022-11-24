import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter({
			pages: 'build'
		}),
		files: {
			assets: 'src/assets',
			hooks: {
				client: 'src/hooks.client',
				server: 'src/hooks.server'
			},
			lib: 'src/lib',
			params: 'src/params',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			appTemplate: 'src/app.html',
			errorTemplate: 'src/error.html'
		}
	}
};

export default config;
