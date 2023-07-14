import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Redirect to app if already logged in
	if (session) {
		throw redirect(303, '/app');
	}

	return { url: url.origin };
};
