import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [houdini(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	server: {
		proxy: {
			'^/(?:.*sitemap.*).(xml|xsl)$': {
				target: 'https://cms.wpdecoupled.dev',
				changeOrigin: true,
			},
		},
	},
});
