import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getRole } }) => {
	const role = await getRole();

	if (role !== 'Admin') {
		throw error(403, `Forbidden`);
	}

	return { url: url.origin };
};
