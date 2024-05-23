import { join } from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { partytownVite } from '@builder.io/partytown/utils';

import houdini from 'houdini/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		houdini(),
		sentrySvelteKit(),
		sveltekit(),
		partytownVite({
			dest: join(__dirname, 'static', '~partytown'),
		}),
	],
});
