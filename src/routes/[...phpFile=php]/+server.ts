import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import type { RequestHandler } from './$types';

export const fallback: RequestHandler = async () => {
	return new Response(ReasonPhrases.NOT_FOUND, {
		status: StatusCodes.NOT_FOUND,
	});
}
