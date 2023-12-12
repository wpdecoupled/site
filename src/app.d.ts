// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Error {
		message: string;
		errorId?: string;
	}

	interface Metadata {
		// the number of times we've retried the request
		retry?: boolean;
	}
}
