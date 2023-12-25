<script>
	import Container from '$lib/components/Container.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Danger Zone
	let dangerZoneMessage = '';
	let dangerZoneError = '';

	let managedStudentID = '';
	let manageMessage = '';
	let manageError = '';

	const resetGame = () => {
		fetch($page.url.origin + '/api/game/admin/resetgame')
			.then(async (res) => {
				if (!res.ok) throw new Error(await res.text());
				dangerZoneMessage = 'success!';
			})
			.catch((err) => (dangerZoneError = err));
	};

	const shuffleTargets = () => {
		fetch($page.url.origin + '/api/game/admin/shuffletargets')
			.then(async (res) => {
				if (!res.ok) throw new Error(await res.text());
				dangerZoneMessage = 'success!';
			})
			.catch((err) => (dangerZoneError = err));
	};

	const forceKillStudent = () => {
		fetch($page.url.origin + '/api/game/admin/forcekillplayer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ student_id: managedStudentID })
		})
			.then(async (res) => {
				if (!res.ok) throw new Error(await res.text());
				manageMessage = 'success!';
			})
			.catch((err) => (manageError = err));
	};

	const forceReviveStudent = () => {
		fetch($page.url.origin + '/api/game/admin/reviveplayer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ student_id: managedStudentID })
		})
			.then(async (res) => {
				if (!res.ok) throw new Error(await res.text());
				manageMessage = 'success!';
			})
			.catch((err) => (manageError = err));
	};
</script>

<Container class="">
	<h1 class="mb-8 text-3xl">Admin Dashboard</h1>
	<div class="rounded-lg bg-neutral-700 p-4">
		<h1 class="mb-4 text-xl font-semibold">Danger Zone</h1>
		<button
			class="mb-4 w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900 md:mb-0 md:w-auto"
			on:click={resetGame}>RESET GAME</button
		>
		<button
			class="ml-2 w-full rounded-lg bg-black px-4 py-2 font-bold md:w-auto"
			on:click={shuffleTargets}>SHUFFLE TARGETS</button
		>
		<div class="text-lg text-green-500">{dangerZoneMessage}</div>
		<div class="text-lg text-red-500">{dangerZoneError}</div>
	</div>
	<div class="mt-4 rounded-lg bg-neutral-700 p-4">
		<h1 class="mb-4 text-xl font-semibold">Manage Student</h1>
		<input
			class="w-64 rounded-lg bg-neutral-800 px-4 py-2"
			placeholder="Student ID (95000000)"
			bind:value={managedStudentID}
		/>
		<div class="mt-4 flex space-x-4">
			<button
				class="rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900"
				on:click={forceKillStudent}>FORCE KILL</button
			>
			<button
				class="rounded-lg bg-green-600 px-4 py-2 font-bold text-green-900"
				on:click={forceReviveStudent}>REVIVE</button
			>
			<div class="text-lg text-green-500">{manageMessage}</div>
			<div class="text-lg text-red-500">{manageError}</div>
		</div>
	</div>
</Container>
