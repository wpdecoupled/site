import { HoudiniClient, type ClientPlugin } from '$houdini';

const SERVER_URL = 'https://cms.wpdecoupled.dev/graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GraphQLVars = Record<string, any> | null | undefined;

function createGetPersistedQueryUrl({
	variables,
	hash,
}: {
	variables?: GraphQLVars;
	hash: string;
}) {
	const url = new URL(SERVER_URL);

	url.searchParams.set('queryId', hash);
	if (variables) {
		url.searchParams.set('variables', JSON.stringify(variables));
	}

	return url.toString();
}

function isMissingHashError(error: { message: string }) {
	if (error.message !== 'PersistedQueryNotFound') {
		return false;
	}

	return true;
}

// if the response contains an error indicating a missing hash, we
// need to try again with the full payload
const persisedGetQueryPlugin: ClientPlugin = () => {
	return {
		afterNetwork(ctx, { client, value, next, resolve }) {
			// if there are no errors, we're good to move on
			if (!value.errors) {
				return resolve(ctx);
			}

			// there was an error, check if it indicates a missing hash
			if (value.errors.some(isMissingHashError) && !ctx.metadata?.retry) {
				client.url = SERVER_URL;
				// try again with the query text
				ctx.metadata = {
					...ctx.metadata,
					retry: true,
				};

				return next(ctx);
			}

			// the error does not indicate there was a missing
			// hash so resolve the request with the error
			return resolve(ctx);
		},
		beforeNetwork(ctx, { client, marshalVariables, next }) {
			const { variables, hash } = ctx;

			if (ctx.metadata?.retry) {
				ctx.fetchParams = {
					...ctx.fetchParams,
					body: JSON.stringify({
						operationName: ctx.name,
						query: ctx.text,
						variables: marshalVariables(ctx),
						extensions: {
							persistedQuery: {
								version: 1,
								sha256Hash: ctx.hash,
							},
						},
					}),
					method: 'POST',
				};

				return next(ctx);
			}

			client.url = createGetPersistedQueryUrl({ variables, hash });
			ctx.fetchParams = {
				...ctx.fetchParams,
				method: 'GET',
				body: undefined,
			};

			return next(ctx);
		},
	};
};

export default new HoudiniClient({
	url: SERVER_URL,
	plugins: [persisedGetQueryPlugin],
});
