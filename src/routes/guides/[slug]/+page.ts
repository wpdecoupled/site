import { error } from '@sveltejs/kit';

import type { AfterLoadEvent } from './$houdini';

export const csr = false;


export function _houdini_afterLoad({ data }: AfterLoadEvent) {
	if (!data.Guide) {
		throw error(404);
	}
}
