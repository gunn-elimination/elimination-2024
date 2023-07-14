<script>
	import Container from '$lib/components/Container.svelte';
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<div class="rounded-lg bg-neutral-800 p-8">
		<div class="flex space-x-4">
			<div class="flex flex-1 flex-col items-start justify-center overflow-hidden">
				<div class="text-neutral-400">Target</div>
				<div class="whitespace-nowrap text-2xl">Ethan Fusdfsdfsdf sdfsdfsdfsdfsdf</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Rank</div>
				<div class="text-2xl">5</div>
			</div>
			<div class="flex flex-col items-center justify-center">
				<div class="text-neutral-400">Kills</div>
				<div class="text-2xl">11</div>
			</div>
		</div>
		<button class="mt-4 w-full rounded-lg bg-red-500 py-2 text-2xl font-bold text-white"
			>Eliminate</button
		>
	</div>
	<div class="rounded-lg bg-neutral-800 p-8">
		<div class="flex flex-1 flex-col items-start justify-center">
			<div class="text-neutral-400">Today</div>
			<div class="text-2xl">Wear Sunglasses</div>
		</div>
	</div>
</Container>
