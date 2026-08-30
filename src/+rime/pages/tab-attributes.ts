import { embed } from '$lib/embed/index.js';
import { slug, tab, text, toggle } from 'rimecms/fields';

export const tabAttributes = tab('attributes')
	.label('Attributes')
	.fields(
		text('title').isTitle().required().layout('compact'),
		toggle('isHome').label('Homepage').live(false),
		slug('slug')
			.slugify('attributes.title')
			.localized()
			.condition((_, siblings) => siblings.isHome !== true)
			.live(false),

		embed('embed').label('Video'),
		embed('podcast').label('Podcast').providers('spotify')
	);
