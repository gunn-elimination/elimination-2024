import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Redirect to app if already logged in
	if (session?.user.role !== 'Admin') {
		throw error(403, `Forbidden`);
	}

	return { url: url.origin };
};
