import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, locals: { supabaseAdmin } }) => {
	const profileID = params.profileID; // 950 number
	const parentData = await parent();

	const profileData = parentData.leaderboard.find((profile) => profile.student_id == profileID);

	const { data: killFeedData, error: killFeedError } = await supabaseAdmin
		.from('kill_feed')
		.select(
			'id, created_at, player_id: players!kill_feed_player_id_fkey (full_name, student_id), target_id: players!kill_feed_target_id_fkey (full_name, student_id)'
		);

	if (!killFeedData || killFeedError) throw new Error('Error fetching kill feed');
	const playerKillFeed = killFeedData.filter((a) => a.player_id?.student_id == profileID);

	if (!profileData) {
		throw error(500, 'Profile not found');
	}

	return { profileData, profileID, playerKillFeed };
};
