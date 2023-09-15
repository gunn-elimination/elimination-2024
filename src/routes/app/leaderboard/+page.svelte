<script>
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';

	export let data;
	let { playerData, leaderboard } = data;
	$: ({ playerData, leaderboard } = data);

	let showLeaderboard = true;
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>
	<div class="p-8">
		<div class="flex">
			<div class="flex-1 flex-col">
				<div class="text-sm text-neutral-400">{playerData.student_id}</div>
				<div class="text-3xl text-white">{playerData.full_name}</div>
			</div>
			<div class="mr-4 text-right">
				<div class=" text-sm text-neutral-400">RANK</div>
				<div class="text-3xl text-white">1</div>
			</div>
			<div class="text-right">
				<div class="text-sm text-neutral-400">KILLS</div>
				<div class="text-3xl text-white">18</div>
			</div>
		</div>

		<div class="mb-16 mt-8 rounded-lg bg-neutral-700 px-8 py-8 shadow-xl">
			<div class="flex justify-between rounded-lg bg-neutral-600 shadow-lg">
				<button
					class="h-full w-full rounded-lg px-6 py-3 text-neutral-400 {showLeaderboard &&
						'bg-neutral-500 text-white'}"
					on:click={() => (showLeaderboard = true)}
				>
					Leaderboard</button
				>
				<button
					class="h-full w-full rounded-lg px-6 py-3 text-neutral-400 {!showLeaderboard &&
						'bg-neutral-500 text-white'}"
					on:click={() => (showLeaderboard = false)}>Kill Feed</button
				>
			</div>
			<div class="mt-6">
				{#if showLeaderboard}
					<div class="flex px-4 py-2 text-neutral-400">
						<div class="ml-4 flex-1 text-sm text-neutral-500">NAME</div>
						<div class="w-16 text-right text-sm text-neutral-500">KILLS</div>
					</div>
					<hr class="h-px border-0 bg-neutral-600" />
					<div class="mt-3 flex flex-col space-y-3">
						{#each leaderboard as player, rank}
							<a
								href="/app/profile/{player.student_id}"
								class={`flex items-end rounded-lg bg-neutral-700/70 px-4 py-2`}
							>
								<div class="-ml-4 mr-6 text-xl text-neutral-300">{rank + 1}</div>
								<div class="flex flex-1 flex-col text-neutral-200">
									<div class="text-xs text-neutral-400">{player.student_id}</div>
									<div class="text-xl text-neutral-300">{player.full_name}</div>
								</div>
								<div class="w-16 pr-2 text-right text-xl text-neutral-300">
									{player.kill_arr.length}
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<div class="text-md rounded-lg bg-neutral-600 px-4 py-2">
						<div class="flex space-x-2">
							<div>Dylan Lu</div>
							<div class=" text-neutral-400">Killed</div>
						</div>
						<div class="flex justify-between">
							<div>Ethan Fu</div>
							<div class=" text-neutral-400">2 hours ago</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
