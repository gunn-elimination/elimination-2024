import { json } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabaseAdmin } }) => {
	const { data, error } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id, kill_arr');

	if (!data || error) throw new Error('Error fetching players');

	data.sort((a, b) => a.kill_arr.length - b.kill_arr.length);

	return { leaderboard: data };
};
