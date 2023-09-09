import { error as Error, json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabaseAdmin, getSession } }) => {
	const session = await getSession();
	if (session?.user.role !== 'Admin') {
		throw Error(403, { message: 'Unauthorized' });
	}

	const { data, error } = await supabaseAdmin.from('targets').select('*');

	return json({ error, data });
};
