<script>
	import Container from '$lib/components/Container.svelte';
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		else goto('/login');
	};
</script>

<Container class="">
	<!-- <div class="rounded-lg bg-neutral-800 p-8">
		<div class="flex space-x-4">
			<div class="flex flex-1 flex-col items-start justify-center">
				<div class="text-neutral-400">ID: 95030486</div>
				<div class="text-2xl">Dylan Lu</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Rank</div>
				<div class="text-2xl">2</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Kills</div>
				<div class="text-2xl">17</div>
			</div>
		</div>
		<button class="mt-4 w-full rounded-lg bg-neutral-700 py-2 text-2xl font-bold text-white"
			>Report</button
		>
	</div>
	<div class="rounded-lg bg-neutral-800 p-8">
		<div class="text-2xl">Recent Kills</div>
		<div class="mt-2 flex flex-col space-y-1">
			{#each [1, 2, 3, 4, 5] as _}
				<div class="flex-col items-start justify-center">
					<div class="text-sm text-neutral-500">2 minutes ago</div>
					<div class="text-lg text-neutral-300">Dylan Lu eliminated Ethan Chen</div>
				</div>
			{/each}
		</div>
	</div> -->
	<!-- TODO: only if it's us -->
	<h1 class="mb-8 text-3xl">Account</h1>
	<button
		class="mb-4 w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900 md:mb-0 md:w-auto"
		on:click={logout}>DELETE ACCOUNT</button
	>
	<button class="w-full rounded-lg bg-neutral-700 px-4 py-2 font-bold md:w-auto" on:click={logout}
		>LOGOUT</button
	>
</Container>
