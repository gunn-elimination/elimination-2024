import { error, json, redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabaseAdmin, getSession } }) => {
	// Check if user is logged in
	const session = await getSession();
	if (!session) throw error(401, 'Unauthorized');

	// Get the player's target
	const { data: playerTarget, error: playerTargetError } = await supabaseAdmin
		.from('targets')
		.select('target')
		.eq('id', session.user.id)
		.single();

	if (!playerTarget || playerTargetError) throw error(500, 'Error fetching your target');

	const targetID = playerTarget.target;
	if (!targetID) throw error(500, 'Error: You do not have a target');

	// Get the kill code for the player's target
	const { data: targetData, error: targetError } = await supabaseAdmin
		.from('targets')
		.select('kill_code, target')
		.eq('id', targetID)
		.single();

	if (!targetData || targetError) throw error(500, 'Error fetching target kill code');

	// Check if the kill code is correct
	const killCode = targetData.kill_code;
	const code = url.searchParams.get('code');

	if (killCode === code) {
		// Delete the target's entry in the targets table
		const { error: deleteError } = await supabaseAdmin.from('targets').delete().eq('id', targetID);
		if (deleteError) throw error(500, 'Error deleting target');

		// Player's target is not alive anymore
		const { error: updateTargetAliveError } = await supabaseAdmin
			.from('players')
			.update({ alive: false })
			.eq('id', targetID);
		if (updateTargetAliveError) throw error(500, 'Error updating target alive status');

		// Update player's kill_arr
		const { data: playerData } = await supabaseAdmin
			.from('players')
			.select('kill_arr')
			.eq('id', session.user.id)
			.single();
		if (!playerData) throw error(500, 'Error fetching player data');

		const { error: updateError } = await supabaseAdmin
			.from('players')
			.update({ kill_arr: [...playerData.kill_arr, targetID] })
			.eq('id', session.user.id);
		if (updateError) throw error(500, 'Error updating player data');

		// Record kill in kill_feed table
		const { error: killFeedError } = await supabaseAdmin
			.from('kill_feed')
			.insert({ player_id: session.user.id, target_id: targetID });
		if (killFeedError) throw error(500, 'Error inserting into kill feed');

		// Update player's target to the target's target
		const { error: setNewTargetError } = await supabaseAdmin
			.from('targets')
			.update({ target: targetData.target })
			.eq('id', session.user.id);
		if (setNewTargetError) throw error(500, 'Error setting new target');

		// Redirect to app or return success
		if (url.searchParams.get('redirect') === 'true') throw redirect(303, '/app');
		else return json({ message: 'Success' });
	}

	return json({ error: 'Incorrect kill code' });
};
