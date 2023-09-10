import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	return { session: await getSession() };
};
