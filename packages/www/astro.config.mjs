import { defineConfig } from 'astro/config';

export default defineConfig({
	srcDir: './src',
	outDir: './build',
	publicDir: './src/assets',
	vite: {
		build: {
			sourcemap: true
		}
	}
});
