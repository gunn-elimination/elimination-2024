import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { supabase, getSession } }) => {
	const session = await getSession();
	const { data } = await supabase.from('players').select('role').eq('id', session?.user.id);

	if (data && data[0].role !== 'Admin') {
		throw error(403, `Forbidden`);
	}

	return { url: url.origin };
};
