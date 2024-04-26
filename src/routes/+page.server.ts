import type { Actions } from './$types';
import { PUBLIC_WP_URL } from '$env/static/public';
import { fail } from '@sveltejs/kit';
import { formatDate } from '$lib/strings';

const FORM_URL = PUBLIC_WP_URL + '/wp-json/contact-form-7/v1/contact-forms/11/feedback';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		data.append('_wpcf7_unit_tag', `wpcf7-f11-${crypto.randomUUID()}`);

		const req = await fetch(FORM_URL, {
			method: 'POST',
			body: data,
		});

		if (!req.ok) {
			return fail(500);
		}

		const resp = await req.json();

		if (resp.status !== 'mail_sent') {
			return fail(422, resp);
		}

		return resp;
	},
} satisfies Actions;
