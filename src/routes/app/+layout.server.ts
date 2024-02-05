import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabaseAdmin } }) => {
	const session = await getSession();
	if (!session) throw redirect(301, '/login');

	// Fetch leaderboard
	const { data: allPlayers, error: playerError } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id, kill_arr, alive');

	if (!allPlayers || playerError) throw new Error('Error fetching players');
	allPlayers.sort((a, b) => {
		// Compare by kill counts first
		const killDiff = b.kill_arr.length - a.kill_arr.length;
		if (killDiff !== 0) {
			return killDiff;
		}
		// If kill counts are the same, alive players come first
		return b.alive === a.alive ? 0 : a.alive ? -1 : 1;
	});

	// Who is our target?
	const { data, error } = await supabaseAdmin
		.from('targets')
		.select('*')
		.eq('id', session.user.id)
		.single();

	const targetID = data?.target;
	const killCode = data?.kill_code;

	// Get basic info on our target
	const { data: targetData, error: targetError } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id')
		.eq('id', targetID)
		.single();

	let targetName = 'No Target';
	let targetStudentID = '00000000';

	if (targetData) {
		targetName = targetData.full_name || 'No Target';
		targetStudentID = targetData.student_id || '00000000';
	}

	return {
		leaderboard: allPlayers,
		targetData: { name: targetName, studentID: targetStudentID },
		killCode,
		session
	};
};
