import { rime } from '$rime/config';
import { adapterSqlite } from 'rimecms/adapter-sqlite';
import { Pages } from './pages/index.ts';

export default rime({
	$adapter: adapterSqlite('embed-field.sqlite'),
	collections: [Pages]
});
