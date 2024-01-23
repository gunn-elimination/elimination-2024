import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent, data }) => {
	const parentData = await parent();

	return { playerData: parentData.playerData, ...data };
};
