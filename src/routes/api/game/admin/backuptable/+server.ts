import { error } from '@sveltejs/kit';
import JSZip from 'jszip';
import { format } from 'date-fns'; // TODO: make this work with dayjs cuz I don't need two date packages

export const GET = async ({ locals: { supabaseAdmin, getRole } }) => {
	const role = await getRole();
	if (role !== 'Admin') {
		throw error(403, { message: 'Unauthorized' });
	}

	const tables = ['players', 'kill_feed', 'targets'];
	const zip = new JSZip();
	const folderName = format(new Date(), 'yyyy-MM-dd');
	const folder = zip.folder(folderName);

	if (!folder) throw error(500, 'Error creating folder');

	for (const table of tables) {
		const { data, error: tableError } = await supabaseAdmin.from(table).select('*').csv();
		if (tableError) throw error(500, `Error fetching ${table}`);
		folder.file(`${table}.csv`, data);
	}

	const zipBlob = await zip.generateAsync({ type: 'blob' });

	return new Response(zipBlob, {
		status: 200,
		headers: {
			'Content-Disposition': `attachment; filename="${folderName}.zip"`,
			'Content-Type': 'application/zip'
		}
	});
};
