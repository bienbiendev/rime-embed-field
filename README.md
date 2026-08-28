# Rime Embed Field

A RimeCMS embed field with preview. Currently support Youtube Vimeo and Spotify providers.

Usage :

```ts
import { embed } from '@rimecms/embed-field';
import { Collection } from '$rime/config';

export const Pages = Collection.create('pages', {
	fields: [embed('video')]
});
```