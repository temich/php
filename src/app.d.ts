// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			metadata?: {
				title?: string
				description?: string
				keywords?: string
				date?: string
			}
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
