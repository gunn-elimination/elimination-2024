import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession, supabaseAdmin } }) => {
	const session = await getSession();
	if (!session) throw redirect(301, '/login');

	const { data, error } = await supabaseAdmin.from('targets').select('*').eq('id', session.user.id);
	if (!data || error) throw new Error('Error fetching target');

	const targetID = data[0].target;
	const killCode = data[0].kill_code;

	const { data: targetData, error: targetError } = await supabaseAdmin
		.from('players')
		.select('full_name, student_id')
		.eq('id', targetID);

	let targetName = 'No Target';
	let targetStudentID = '00000000';

	if (targetData) {
		targetName = targetData[0].full_name || 'No Target';
		targetStudentID = targetData[0].student_id || '00000000';
	}

	return {
		targetData: { name: targetName, studentID: targetStudentID },
		killCode,
		session
	};
};
