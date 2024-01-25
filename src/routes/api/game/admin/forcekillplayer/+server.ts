import { json, error } from '@sveltejs/kit';

export const POST = async ({ url, locals: { supabaseAdmin, getSession, getRole }, request }) => {
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	const { student_id } = await request.json();

	// killedPlayer = the player we're force killing
	// originalPlayer = the player who had this guy as the target

	const { data: killedPlayer } = await supabaseAdmin
		.from('players')
		.select('id')
		.eq('student_id', student_id)
		.single();

	if (!killedPlayer) throw error(500, 'Error fetching player with that student id');

	// Delete the player's entry in the targets table
	const { data: killedPlayerTarget } = await supabaseAdmin
		.from('targets')
		.select('target')
		.eq('id', killedPlayer.id)
		.single();
	if (!killedPlayerTarget) throw error(500, 'Error deleting target');

	// Delete the player's entry in the targets table
	const { error: deleteError } = await supabaseAdmin
		.from('targets')
		.delete()
		.eq('id', killedPlayer.id);
	if (deleteError) throw error(500, 'Error deleting target');

	// Player's target is not alive anymore
	const { error: updateTargetAliveError } = await supabaseAdmin
		.from('players')
		.update({ alive: false })
		.eq('id', killedPlayer.id);
	if (updateTargetAliveError) throw error(500, 'Error updating target alive status');

	// Get the player who had this player
	const { data: originalPlayerTargetData, error: getPlayerError } = await supabaseAdmin
		.from('targets')
		.select('id')
		.eq('target', killedPlayer.id)
		.single();
	if (!originalPlayerTargetData) throw error(500, 'Error fetching the original player target data');

	const { data: originalPlayer } = await supabaseAdmin
		.from('players')
		.select('*')
		.eq('id', originalPlayerTargetData.id)
		.single();
	if (!originalPlayer) throw error(500, 'Error fetching original player');

	const { error: updateError } = await supabaseAdmin
		.from('players')
		.update({ kill_arr: [...originalPlayer.kill_arr, killedPlayer.id] })
		.eq('id', originalPlayer.id);
	if (updateError) throw error(500, 'Error updating player data');

	// Record kill in kill_feed table
	const { error: killFeedError } = await supabaseAdmin
		.from('kill_feed')
		.insert({ player_id: originalPlayer.id, target_id: killedPlayer.id });
	if (killFeedError) throw error(500, 'Error inserting into kill feed');

	// Update player's target to the target's target
	const { error: setNewTargetError } = await supabaseAdmin
		.from('targets')
		.update({ target: killedPlayerTarget.target })
		.eq('id', originalPlayer.id);
	if (setNewTargetError) throw error(500, 'Error setting new target');

	// Redirect to app or return success
	return json({ mesage: 'Successfully force killed player' });
};
