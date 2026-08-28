<script lang="ts">
	import { embedSrc, parseEmbedUrl } from '../parse.js';

	type Props = {
		value: { url: string } | null | undefined;
		title?: string;
		class?: string;
	};

	const { value, title = 'Embed', class: className }: Props = $props();

	const parsed = $derived(value?.url ? parseEmbedUrl(value.url) : null);
</script>

{#if parsed}
	<iframe
		class={className}
		src={embedSrc(parsed)}
		{title}
		loading="lazy"
		sandbox="allow-scripts allow-same-origin allow-presentation"
		allow="encrypted-media; picture-in-picture"
	></iframe>
{/if}
