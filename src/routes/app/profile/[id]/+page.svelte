<script>
	import Container from '$lib/components/Container.svelte';
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<div class="rounded-lg bg-neutral-800 p-8">
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
	</div>
</Container>
