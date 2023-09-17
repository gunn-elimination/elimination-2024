import { error, json } from '@sveltejs/kit';
import type { Database } from '../../../../../database.types.js';

export const GET = async ({ url, locals: { supabaseAdmin, getSession, getRole } }) => {
	// Check if user is admin
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	// Get all players
	const { data: playerData, error: playerError } = await supabaseAdmin.from('players').select('*');
	if (!playerData || playerError) throw error(500, 'Error fetching players');

	// Set all players to alive
	const { error: aliveError } = await supabaseAdmin
		.from('players')
		.update({ alive: true })
		.eq('alive', false); // Supabase requires a filter for update
	if (aliveError) throw error(500, 'Error setting players to alive');

	// Set all players' kill_arr to empty
	const { error: killArrError } = await supabaseAdmin
		.from('players')
		.update({ kill_arr: [] })
		.neq('alive', false); // This is a hack to make sure all players are updated
	if (killArrError)
		throw error(500, 'Error setting players kill_arr to empty' + killArrError.details);

	// Delete all targets
	const { error: deleteError } = await supabaseAdmin
		.from('targets')
		.delete()
		.neq('kill_code', 'hackcuzthiswillneverhappen');
	if (deleteError) throw error(500, 'Error deleting targets');

	// Add target entries for all players
	const { error: insertError } = await supabaseAdmin
		.from('targets')
		.insert(playerData.map((player) => ({ id: player.id })));
	if (insertError) throw error(500, 'Error inserting targets');

	return json({ message: 'Success' });
};
