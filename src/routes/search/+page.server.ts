import type { PageServerLoad } from './$types';
import { SearchQueryStore } from '$houdini';

export const load: PageServerLoad = async (event) => {
	const { url } = event;
	const query = url.searchParams.get('q');

	const SearchQuery = new SearchQueryStore();

	if(!query) return { query: "Query Required", results: [] }

	const results = (await SearchQuery.fetch({ event, variables: { query } })).data?.contentNodes?.edges

	return {
		query,
		results,
	};
};
