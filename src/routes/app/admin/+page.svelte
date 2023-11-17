<script>
	import Container from '$lib/components/Container.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let message = '';
	let error = '';
    let killStudentID = '';

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

<Container class="">
	<h1 class="mb-8 text-3xl">Admin Dashboard</h1>
    <div class="bg-neutral-700 rounded-lg p-4">
        <h1 class="font-semibold text-xl mb-4">Danger Zone</h1>
        <button
            class="mb-4 w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900 md:mb-0 md:w-auto"
            on:click={resetGame}>RESET GAME</button
        >
        <button
            class="ml-2 w-full rounded-lg bg-black px-4 py-2 font-bold md:w-auto"
            on:click={shuffleTargets}>SHUFFLE TARGETS</button
        >
        <div class="text-lg text-green-500">{message}</div>
        <div class="text-lg text-red-500">{error}</div>
    </div>
    <div class="bg-neutral-700 rounded-lg p-4 mt-4">
        <h1 class="font-semibold text-xl mb-4">Force Kill Student</h1>
        <input class="w-64 rounded-lg bg-neutral-800 px-4 py-2" placeholder="Student ID (95000000)" bind:value={killStudentID} />
        <div class="flex space-x-4 mt-4">
            <button class="bg-red-600 text-red-900 rounded-lg px-4 py-2">Force Kill</button>
            <button class="bg-green-600 text-green-900 rounded-lg px-4 py-2">Revive</button>
        </div>
    </div>
</Container>
