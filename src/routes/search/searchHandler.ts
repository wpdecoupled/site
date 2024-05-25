import { redirect } from '@sveltejs/kit';
import { StatusCodes } from 'http-status-codes';

// import type { LayoutLoad } from '../$types';



export function searchHandler({ url }: { url: URL}): void {
	if (url.searchParams.has('s')) {
		const new_url = new URL('/search', url.origin);
		new_url.searchParams.append('q', url.searchParams.get('s')!);
		redirect(StatusCodes.PERMANENT_REDIRECT, new_url.toString());
	}
};
