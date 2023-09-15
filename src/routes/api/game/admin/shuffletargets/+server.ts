import { error, json } from '@sveltejs/kit';
import type { Database } from '../../../../../database.types.js';

export const GET = async ({ url, locals: { supabaseAdmin, getSession, getRole } }) => {
	// Check if user is admin
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	// Get all targets
	const { data: targetData, error: targetError } = await supabaseAdmin.from('targets').select('*');
	if (!targetData || targetError) throw error(500, targetError.details);

	// Shuffle people and assign targets to next person (wrap around at end)
	// Also assign random kill codes
	const shuffledTargets = targetData.sort(() => Math.random() - 0.5);
	for (let i = 0; i < shuffledTargets.length; i++) {
		if (i === shuffledTargets.length - 1) shuffledTargets[i].target = shuffledTargets[0].id;
		else shuffledTargets[i].target = shuffledTargets[i + 1].id;

		shuffledTargets[i].kill_code = Math.floor(Math.random() * 100000)
			.toString()
			.padStart(5, '0');
	}

	// Update targets table
	const { error: shuffleError } = await supabaseAdmin.from('targets').upsert(shuffledTargets);
	if (shuffleError) throw error(500, shuffleError.details);

	return json({ targetData });
};
