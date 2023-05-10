import { error } from '@sveltejs/kit'

import type { AfterLoadEvent } from "./$houdini";

export function _houdini_afterLoad ({ data }: AfterLoadEvent) {
	if (!data.Article) {
			throw error(404)
	}
}
