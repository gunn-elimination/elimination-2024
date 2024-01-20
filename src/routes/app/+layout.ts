import type { LayoutLoad } from './$types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: LayoutLoad = async ({ fetch, depends, parent, data }) => {
	const { supabase, session } = await parent();

	if (!session) throw new Error('No session found');

	const playerTable = await supabase.from('players').select('*').eq('id', session.user.id).single();
	const gameMessage = await supabase.from('message').select('*').single();

	if (playerTable.error || !playerTable.data) throw new Error('Error fetching player or target');

	return { playerData: playerTable.data, gameMessage: gameMessage.data?.message, ...data };
};
