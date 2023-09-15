// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session } from '@supabase/supabase-js';
import { Database } from './database.types';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			supabaseAdmin: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getRole(): Promise<string | null>;
		}
		interface PageData {
			session: Session | null;
			supabase: SupabaseClient<Database>;
			playerData?: Database['public']['Tables']['players']['Row'];
			targetData?: { name: string; studentID: string };
			leaderboard?: Database['public']['Tables']['players']['Row'][];
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
