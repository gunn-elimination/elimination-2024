import { invalidate } from '$app/navigation';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import type { Database } from '../database.types';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase: SupabaseClient<Database> = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	if (!session) throw new Error('No session');

	const playerTable = await supabase.from('players').select('*').eq('id', session.user.id);
	const targetTable = await supabase.from('targets').select('*').eq('id', session.user.id);

	if (playerTable.error || targetTable.error || !playerTable.data || !targetTable.data)
		throw new Error('Error fetching player or target');

	return { supabase, session, playerData: playerTable.data[0], targetData: targetTable.data[0] };
};
