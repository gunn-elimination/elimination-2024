<script>
	import Container from '$lib/components/Container.svelte';

	let challenge = "Wear sunglasses so you don't die";
	let target = 'Ethan Fu';
	let rank = 5;
	let kills = 11;

	let code = '';
</script>

<Container class="flex h-full w-screen flex-col space-y-4 pt-8">
	<!-- Rule for Today -->
	<div class="flex flex-col items-start rounded-lg bg-neutral-800 p-6">
		<h2 class="text-lg text-neutral-400">Today's Challenge</h2>
		<p class="text-lg text-neutral-300">{challenge}</p>
	</div>
	<!-- Target -->
	<div class="flex rounded-lg bg-red-900/20 p-6">
		<div class="flex-1">
			<h2 class="text-lg text-neutral-400">Target</h2>
			<p class="text-2xl font-bold text-red-500">{target}</p>
		</div>
		<div class="mr-4 text-center">
			<h2 class="text-lg text-neutral-400">Rank</h2>
			<p class="text-2xl font-bold text-red-500">{rank}</p>
		</div>
		<div class="text-center">
			<h2 class="text-lg text-neutral-400">Kills</h2>
			<p class="text-2xl font-bold text-red-500">{kills}</p>
		</div>
	</div>
	<!-- Controls-->
	<div class="class flex-col rounded-lg bg-neutral-800 p-6">
		<h2 class="mb-4 text-lg text-neutral-400">Controls</h2>
		<div class="flex flex-col space-y-2">
			<button class="mb-4 rounded-lg bg-neutral-700 px-4 py-2 text-lg font-bold"
				>Show Your Code</button
			>
			<input
				bind:value={code}
				placeholder={`${target}'s Code`}
				class="rounded-lg px-4 py-2 shadow-inner"
			/>
			<button class="rounded-lg bg-red-500 px-4 py-2 text-lg font-bold">Eliminate</button>
		</div>
	</div>
</Container>
