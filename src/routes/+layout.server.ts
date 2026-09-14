
import { toPublicUser } from 'rimecms/server';
import type { ServerLoadEvent } from '@sveltejs/kit';
export const load = async ({ locals }: ServerLoadEvent) => {
	return { user: toPublicUser(locals.user) };
};