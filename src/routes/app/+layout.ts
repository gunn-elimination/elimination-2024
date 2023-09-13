import type { LayoutLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: LayoutLoad = async ({ fetch, depends, parent }) => {
	const { supabase, session } = await parent();

	if (!session) throw new Error('No session found');

	const playerTable = await supabase.from('players').select('*').eq('id', session.user.id);
	const targetTable = await supabase.from('targets').select('*').eq('id', session.user.id);

	if (playerTable.error || targetTable.error || !playerTable.data || !targetTable.data)
		throw new Error('Error fetching player or target');

	return { supabase, session, playerData: playerTable.data[0], targetData: targetTable.data[0] };
};
