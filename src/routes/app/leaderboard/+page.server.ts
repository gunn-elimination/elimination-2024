import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabaseAdmin } }) => {
	const { data, error } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id, kill_arr');

	if (!data || error) throw new Error('Error fetching players');

	data.sort((a, b) => b.kill_arr.length - a.kill_arr.length);

	return { leaderboard: data };
};
