import type { FormFieldBuilder } from 'rimecms/fields';
import type { DocumentFormContext } from 'rimecms/types';
import type { EmbedField } from '../index.js';

export type EmbedFieldProps = {
	path?: string;
	config: FormFieldBuilder<EmbedField>;
	form: DocumentFormContext;
};
