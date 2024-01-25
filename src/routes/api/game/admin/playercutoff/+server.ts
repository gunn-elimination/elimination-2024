import { error, json } from '@sveltejs/kit';

export const POST = async ({ url, locals: { supabaseAdmin, getSession, getRole }, request }) => {
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	const { kill_requirement } = await request.json();

	if (!kill_requirement) throw error(422, 'Invalid kill_requirement');

	// Fetch all players
	const { data: playersData, error: playersError } = await supabaseAdmin
		.from('players')
		.select('*');

	if (!playersData || playersError) throw error(500, 'Error with players table');

	// Filter players with less than one kill
	const playersToUpdate = playersData.filter((player) => player.kill_arr.length < kill_requirement);

	// Update these players
	for (const player of playersToUpdate) {
		const { error: updateError } = await supabaseAdmin
			.from('players')
			.update({ alive: false })
			.eq('id', player.id); // Assuming each player has a unique 'id' field

		if (updateError) {
			throw updateError;
		}
	}

	return json({ message: 'Successfully cutoff players' });
};
