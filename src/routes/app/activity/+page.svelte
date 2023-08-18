<script lang="ts">
	import Container from '$lib/components/Container.svelte';

	let showLeaderboard = true;

	let tmpData = [
		{
			rank: 1,
			name: 'Dylan Lu',
			kills: 18
		},
		{
			rank: 2,
			name: 'Ethan Fu',
			kills: 14
		},
		{
			rank: 3,
			name: 'James Ford',
			kills: 12
		},
		{
			rank: 4,
			name: 'Hayden Chong',
			kills: 6
		},
		{
			rank: 5,
			name: 'Ethan Chen',
			kills: 6
		}
	];
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<div class="rounded-lg bg-neutral-800 p-8">
		<div class="flex">
			<button
				class={`text-md w-full rounded-xl font-semibold ${
					showLeaderboard ? 'bg-neutral-700' : ''
				} px-4 py-2`}
				on:click={() => (showLeaderboard = true)}>Leaderboard</button
			>
			<button
				class={`text-md w-full rounded-xl font-semibold ${
					!showLeaderboard ? 'bg-neutral-700' : ''
				} px-4 py-2`}
				on:click={() => (showLeaderboard = false)}>Kill Feed</button
			>
		</div>
		{#if showLeaderboard}
			<div class="mt-4 flex px-4 py-2 text-neutral-400">
				<div class="w-16 text-left text-neutral-300">Rank</div>
				<div class="flex-1 text-neutral-300">Name</div>
				<div class="w-16 text-right text-neutral-300">Kills</div>
			</div>
			<div class="flex flex-col space-y-2">
				{#each [1, 2, 3, 4, 5, 6, 7] as num}
					<a
						href="/app/profile/@me"
						class={`flex rounded-lg bg-neutral-700/70 ${num <= 3 ? 'py-4' : 'py-2'} px-4`}
					>
						<div class="w-16 pl-4 text-left text-neutral-200">{num}</div>
						<div class="flex-1 font-semibold text-neutral-200">Dylan Lu</div>
						<div class="w-16 pr-2 text-right text-neutral-200">13</div>
					</a>
				{/each}
			</div>
		{:else}
			<div class="flex flex-col space-y-2">
				{#each [1, 2, 3, 4, 5, 6, 7] as num}
					<div class="mt-4 flex flex-col rounded-lg bg-neutral-700/70 px-4 py-2">
						<div>
							<a href="/app/profile/@me" class="font-semibold">Dylan Lu</a>{' '}<span
								class="text-neutral-300">eliminated</span
							>
						</div>
						<div class="flex justify-between">
							<a href="/app/profile/@me" class="font-semibold">James Ford</a>
							<div class="text-sm text-neutral-300">2 hours ago</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Container>
