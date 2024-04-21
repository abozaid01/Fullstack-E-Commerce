// svelte-icons-pack.d.ts

declare module 'svelte-icons-pack/Icon.svelte' {
	import { SvelteComponentTyped } from 'svelte';

	interface IconProps {
		src: { [key]: string };
		color?: string;
		size?: string | number;
		viewBox?: string;
		className?: string;
		title?: string;
	}

	export default class Icon extends SvelteComponentTyped<IconProps> {}
}
