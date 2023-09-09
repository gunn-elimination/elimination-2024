import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ locals: { getSession } }) => {
	return { session: await getSession() };
};
