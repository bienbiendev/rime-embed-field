import { env } from '$env/dynamic/public';
import { Collection } from '$rime/config';
import { tabs } from 'rimecms/fields';
import { tabAttributes } from './tab-attributes.ts';

export const Pages = Collection.create('pages', {
	fields: [tabs(tabAttributes)],
	live: true,
	$url: () => `${env.PUBLIC_RIME_URL}/`,
	access: {
		read: () => true
	}
});
