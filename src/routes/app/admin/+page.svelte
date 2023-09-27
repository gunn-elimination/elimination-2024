<script>
	import Container from '$lib/components/Container.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let message = '';
	let error = '';

	const resetGame = () => {
		fetch($page.url.origin + '/api/game/admin/resetgame')
			.then(() => {
				message = 'success!';
			})
			.catch((err) => (error = err));
	};

	const shuffleTargets = () => {
		fetch($page.url.origin + '/api/game/admin/shuffletargets')
			.then(() => {
				message = 'success!';
			})
			.catch((err) => (error = err));
	};
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<h1 class="text-3xl">Admin Dashboard</h1>
	<button class="w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900" on:click={resetGame}
		>RESET GAME</button
	>
	<button class="w-full rounded-lg bg-neutral-700 px-4 py-2 font-bold" on:click={shuffleTargets}
		>SHUFFLE TARGETS</button
	>
	<div class="text-lg text-green-500">{message}</div>
	<div class="text-lg text-red-500">{error}</div>
</Container>
