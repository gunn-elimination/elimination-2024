import { json, error } from '@sveltejs/kit';

export const POST = async ({ url, locals: { supabaseAdmin, getRole }, request }) => {
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	const { student_id } = await request.json();

	// revivedPlayer = player to revive
	// killerPlayer = player who originally killed them

	// Fetching the player to revive
	const { data: revivedPlayer, error: fetchError } = await supabaseAdmin
		.from('players')
		.select('id, kill_arr')
		.eq('student_id', student_id)
		.single();

	if (fetchError || !revivedPlayer) throw error(500, 'Error fetching player with that student id');

	// Find the killer from the kill_feed table
	const { data: killFeedEntry, error: killFeedError } = await supabaseAdmin
		.from('kill_feed')
		.select('player_id')
		.eq('target_id', revivedPlayer.id)
		.single();

	if (killFeedError || !killFeedEntry) throw error(500, 'Error finding killer in kill feed');

	// Delete the kill_feed entry
	const { error: deleteKillFeedError } = await supabaseAdmin
		.from('kill_feed')
		.delete()
		.eq('target_id', revivedPlayer.id);
	if (deleteKillFeedError) throw error(500, 'Error deleting kill feed entry');

	// Fetch the killer's data
	const { data: killerPlayer, error: killerFetchError } = await supabaseAdmin
		.from('players')
		.select('kill_arr, id')
		.eq('id', killFeedEntry.player_id)
		.single();

	if (killerFetchError || !killerPlayer) throw error(500, 'Error fetching killer player data');

	// Remove the revived player from the killer's kill_arr
	const updatedKillArr = killerPlayer.kill_arr.filter((id) => id !== revivedPlayer.id);
	const { error: updateKillerError } = await supabaseAdmin
		.from('players')
		.update({ kill_arr: updatedKillArr })
		.eq('id', killerPlayer.id);

	if (updateKillerError) throw error(500, 'Error updating killer player data');

	// Set the player's alive status to true
	const { error: reviveError } = await supabaseAdmin
		.from('players')
		.update({ alive: true })
		.eq('id', revivedPlayer.id);

	if (reviveError) throw error(500, 'Error reviving player');

	// Add player back into target pool
	const { error: addTargetError } = await supabaseAdmin
		.from('targets')
		.insert({ id: revivedPlayer.id, target: null, kill_code: null });
	if (addTargetError) throw error(500, 'Error adding player to targets table');

	return json({ message: 'Player revived successfully' });
};
