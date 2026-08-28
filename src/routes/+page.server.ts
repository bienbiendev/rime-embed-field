import type { ServerLoadEvent } from '@sveltejs/kit';
export const load = async ({ locals }: ServerLoadEvent) => {
	const { rime } = locals;

	const pages = await rime.collection('pages').find({
		limit: 1
	});

	if (!pages || pages.length === 0) return { doc: null };
	return { doc: pages[0] };
};
