<script lang="ts">
	import { Field, Input } from 'rimecms/panel';
	import type { EmbedValue } from '../index.ts';
	import { embedSrc, parseEmbedUrl, type ParsedEmbed } from '../parse.js';
	import type { EmbedFieldProps } from './props.js';

	const { path, config, form }: EmbedFieldProps = $props();

	const field = $derived(form.useField<EmbedValue>(path || config.name, config));
	let url = $derived(field.value?.url || '');
	const parsed = $derived(parseEmbedUrl(url));

	const onInput = (event: Event) => {
		field.value = {
			url: (event.target as HTMLInputElement).value,
			provider: parsed?.provider || null,
			src: parsed ? embedSrc(parsed) : null
		};
	};
</script>

<fieldset use:Field.fieldset={field} class="rz-embed-field {config.get.className || ''}">
	<Field.Label {config} for={path || config.name} />
	{#if parsed && !field.error}
		{@const value = parsed as ParsedEmbed}
		<iframe
			class="rz-embed-field__iframe rz-embed-field__iframe--{parsed.provider}"
			src={embedSrc(value)}
			title={config.get.label || 'Embed preview'}
			loading="lazy"
			sandbox="allow-scripts allow-same-origin allow-presentation"
			allow="encrypted-media; picture-in-picture"
		></iframe>
	{/if}
	<Input
		id={path || config.name}
		name={path || config.name}
		bind:value={url}
		type="url"
		placeholder="Paste your url here..."
		autocomplete="off"
		data-error={field.error ? '' : null}
		oninput={onInput}
	/>
	<Field.Hint {config} />
	<Field.Error error={field.error} />
</fieldset>

<style>
	.rz-embed-field {
		display: flex;
		flex-direction: column;
		gap: var(--rz-size-2);
	}

	.rz-embed-field__iframe {
		aspect-ratio: 16 / 9;
		width: 100%;
		max-width: 600px;
		border: 1px solid var(--rz-input-border-color);
		border-radius: var(--rz-size-4);
	}
	.rz-embed-field__iframe--spotify {
		aspect-ratio: 16 / 5;
	}
	.rz-embed-field__iframe--youtube,
	.rz-embed-field__iframe--vimeo {
		aspect-ratio: 16 / 9;
	}
</style>
