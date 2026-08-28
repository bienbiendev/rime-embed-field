import { sequence } from '@sveltejs/kit/hooks';
import { handlers } from 'rimecms/server';
import config from './lib/+rime.generated/rime.config.server.js';

export const handle = sequence(...(await handlers(config)));
