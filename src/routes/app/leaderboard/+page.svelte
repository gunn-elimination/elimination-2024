<script>
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';
	import pattern from '$lib/assets/images/backgrounds/circuit-board.svg';

	let challenge = "Wear sunglasses so you don't die";
	let target = 'Ethan Fu';
	let rank = 5;
	let kills = 11;

	let code = '';
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
		<!-- <img src={pattern} alt="background" class="h-1/3 w-full object-cover object-center" />
		<img src={pattern} alt="background" class="h-1/3 w-full object-cover object-center" />
		<img src={pattern} alt="background" class="h-1/3 w-full object-cover object-center" /> -->
	</div>
	<div class="p-8">
		<div class="flex">
			<div class="flex-1 flex-col">
				<div class="text-sm text-neutral-400">95030486</div>
				<div class="text-3xl text-white">Dylan Lu</div>
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
				<button class="h-full w-full rounded-lg bg-neutral-500 px-6 py-3">Leaderboard</button>
				<button class="h-full w-full px-6 py-3 text-neutral-400">Kill Feed</button>
			</div>
			<div class="mt-6">
				<div class="flex px-4 py-2 text-neutral-400">
					<div class="ml-4 flex-1 text-sm text-neutral-500">NAME</div>
					<div class="w-16 text-right text-sm text-neutral-500">KILLS</div>
				</div>
				<hr class="h-px border-0 bg-neutral-600" />
				<div class="mt-3 flex flex-col space-y-3">
					{#each [1, 2, 3, 4, 5, 6, 7] as num}
						<a
							href="/app/profile/@me"
							class={`flex items-end rounded-lg bg-neutral-700/70 px-4 py-2`}
						>
							<div class="-ml-4 mr-6 text-xl text-neutral-300">{num}</div>
							<div class="flex flex-1 flex-col text-neutral-200">
								<div class="text-xs text-neutral-400">95030486</div>
								<div class="text-xl text-neutral-300">Dylan Lu</div>
							</div>
							<div class="w-16 pr-2 text-right text-xl text-neutral-300">13</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
