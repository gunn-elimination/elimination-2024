import { json } from '@sveltejs/kit';

export const POST = async ({ url, locals: { supabaseAdmin, getSession, getRole }, request }) => {
	const { student_id } = await request.json();

	const { data } = await supabaseAdmin
		.from('players')
		.select('id')
		.eq('student_id', student_id)
		.single();

	return json({ mesage: 'Success' });
};
