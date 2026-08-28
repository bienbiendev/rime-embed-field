<script lang="ts">
	import { LiveEdit, LiveProvider } from 'rimecms';

	const { data } = $props();
</script>

<LiveProvider>
	{#if data.doc}
		<LiveEdit data={data.doc}>
			{#snippet child(page, props)}
				<div {...props}>
					<h1>{page.attributes.title}</h1>
					{#if page.attributes.embed?.src}
						<iframe src={page.attributes.embed.src} title="video"></iframe>
					{/if}
				</div>
			{/snippet}
		</LiveEdit>
	{/if}
</LiveProvider>
