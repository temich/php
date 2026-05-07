declare module '*.md' {
	import { SvelteComponent } from 'svelte';
	export default class Comp extends SvelteComponent {}
	export const metadata: Record<string, unknown>;
}

declare module '*.svx' {
	import { SvelteComponent } from 'svelte';
	export default class Comp extends SvelteComponent {}
	export const metadata: Record<string, unknown>;
}
