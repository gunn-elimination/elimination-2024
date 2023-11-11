import type { Database } from '../../database.types';

export function getRank(
	leaderboard: Partial<Database['public']['Tables']['players']['Row']>[],
	student_id: string
) {
	let rank = 0;
	for (let i = 0; i < leaderboard.length; i++) {
		if (leaderboard[i].student_id == student_id) {
			rank = i + 1;
			break;
		}
	}

	return rank;
}
