<script>
	import backgroundImage from '$lib/assets/images/gunn-background.jpg';

	let challenge = "Wear sunglasses so you don't die";
	let target = 'Ethan Fu';
	let rank = 5;
	let kills = 11;

	let code = '';
</script>

<div>
	<div class="fixed -z-10 w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
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

		<div class="mt-8 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">TODAY</div>
			<div class="text-lg">Wear a hat to stay safe</div>
		</div>
	</div>
</div>

<!-- Target Card -->
<!-- <div class="mt-6 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
	<div class="text-sm text-neutral-400">TARGET</div>
	<div class="mt-3 flex w-full justify-center space-x-2">
		<button class="rounded-lg bg-red-600 px-6 py-2 text-sm font-bold text-red-900 shadow-md"
			>ELIMINATE</button
		>
		<button class="rounded-lg px-6 py-2 text-sm text-gray-300">REPORT</button>
	</div>
</div> -->
