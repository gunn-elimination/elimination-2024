import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabaseAdmin } }) => {
	const { data: playersData, error: playerError } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id, kill_arr');

	if (!playersData || playerError) throw new Error('Error fetching players');
	playersData.sort((a, b) => b.kill_arr.length - a.kill_arr.length);

	const { data: killFeedData, error: killFeedError } = await supabaseAdmin
		.from('kill_feed')
		.select(
			'id, created_at, player_id: players!kill_feed_player_id_fkey (full_name), target_id: players!kill_feed_target_id_fkey (full_name)'
		);

	if (!killFeedData || killFeedError) throw new Error('Error fetching kill feed');
	killFeedData.sort((a, b) => b.id - a.id);

	return { leaderboard: playersData, killFeed: killFeedData };
};
