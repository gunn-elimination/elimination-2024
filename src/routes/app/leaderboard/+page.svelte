<script>
	import Container from '$lib/components/Container.svelte';
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<div class="rounded-lg bg-neutral-800 p-8">
		<div class="flex">
			<button class="text-md w-full rounded-xl bg-neutral-700 px-4 py-2">Leaderboard</button>
			<button class="text-md w-full rounded-xl px-4 py-2">Kill Feed</button>
		</div>
		<div class="mt-4 flex space-x-8">
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Rank</div>
				<div class="text-2xl">1</div>
			</div>
			<div class="flex flex-1 flex-col items-start justify-center overflow-hidden">
				<div class="text-neutral-400">Name</div>
				<div class="whitespace-nowrap text-2xl">Dylan Lu</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Kills</div>
				<div class="text-2xl">18</div>
			</div>
		</div>
	</div>
</Container>
