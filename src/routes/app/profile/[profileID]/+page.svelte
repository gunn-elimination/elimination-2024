<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';
	import { goto } from '$app/navigation';
	import { getRank } from '$lib/utils/getRank';
	import { dateToRelative } from '$lib/utils/dateToRelative';

	export let data;

	let { supabase, leaderboard, profileData, playerData, profileID, playerKillFeed } = data;
	$: ({ supabase, leaderboard, profileData, playerData, profileID, playerKillFeed } = data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
		else goto('/login');
	};
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>

	<Container class="">
		<div class="flex">
			<div class="flex-1 flex-col">
				<div class="text-sm text-neutral-400">
					{profileData.student_id}
				</div>
				<div class="text-3xl {!profileData.alive ? ' text-neutral-500 line-through' : ''}">
					{profileData.full_name}
				</div>
			</div>
			<div class="mr-4 text-right">
				<div class=" text-sm text-neutral-400">RANK</div>
				<div class="text-3xl text-white">
					{getRank(leaderboard, profileData.student_id || '')}
				</div>
			</div>
			<div class="text-right">
				<div class="text-sm text-neutral-400">ELIMS</div>
				<div class="text-3xl text-white">{profileData.kill_arr.length}</div>
			</div>
		</div>
		<div class="mt-8 rounded-lg bg-neutral-700 p-6">
			<div class="text-2xl">Recent Elims</div>
			<div class="mt-4 flex flex-col space-y-3">
				{#each playerKillFeed as kill}
					<div class="text-md rounded-lg bg-neutral-600 px-4 py-2 text-neutral-300">
						<div class="flex space-x-2">
							<a class="hover:underline" href="/app/profile/{kill.player_id?.student_id}"
								>{kill.player_id?.full_name}</a
							>
							<div class=" text-neutral-400">eliminated</div>
						</div>
						<div class="flex flex-col justify-between md:flex-row">
							<a class="hover:underline" href="/app/profile/{kill.target_id?.student_id}"
								>{kill.target_id?.full_name}</a
							>
							<div class=" text-neutral-400">{dateToRelative(kill.created_at)}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		{#if playerData.student_id == profileID}
			<button
				class="mb-16 mt-4 w-full rounded-lg bg-red-600 px-4 py-2 font-bold text-red-900 shadow-lg md:w-auto"
				on:click={logout}>LOGOUT</button
			>
		{/if}
	</Container>
</div>
