import { FormFieldBuilder } from 'rimecms/fields';
import type { FormField } from 'rimecms/types';
import Embed from './component/Embed.svelte';
import { parseEmbedUrl } from './parse.js';

export type EmbedProviders = 'youtube' | 'spotify' | 'vimeo';
export type EmbedValue = { url: string; provider: EmbedProviders | null; src: string | null };

export type EmbedField = FormField & {
	type: 'embed';
	defaultValue?: EmbedValue;
	providers: EmbedProviders[];
};

export class EmbedFieldBuilder extends FormFieldBuilder<EmbedField> {
	//
	constructor(name: string) {
		super(name, 'embed');
		this.field.isEmpty = (value: unknown) => !(value as EmbedValue | null)?.url;
		this.field.providers = ['youtube', 'spotify', 'vimeo'];
		this.field.validate = this.isValid.bind(this);
	}

	protected isValid(value: unknown) {
		const url = (value as EmbedValue | null)?.url;
		if (!url) return true;
		const parsed = parseEmbedUrl(url);
		if (!parsed) return 'Unsupported URL — paste a YouTube, Spotify or Vimeo link';
		if (!this.field.providers.includes(parsed.provider)) return 'Unsupported provider';
		return true;
	}

	providers(...providers: EmbedProviders[]) {
		this.field.providers = providers;
		return this;
	}

	get dataType() {
		return 'json' as const;
	}

	get component() {
		return Embed;
	}

	get cell() {
		return null;
	}

	protected override generateType() {
		return `${this.field.name}${this.get.required ? '' : '?'}: { url: string; provider: 'youtube' | 'spotify' | 'vimeo'; src: string }`;
	}
}

export const embed = (name: string) => new EmbedFieldBuilder(name);
