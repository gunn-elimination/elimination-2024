import { error as Error, json } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabaseAdmin, getSession } }) => {
	return json({});
};
