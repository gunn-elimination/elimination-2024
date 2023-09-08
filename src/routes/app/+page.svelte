<script>
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>
	<div class="p-8">
		<div class="text-3xl text-white">Target</div>
		<div class="mt-8 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-300">95030486</div>
			<div class="text-3xl">Ethan Fu</div>
			<div class="mt-6 flex w-full justify-center space-x-2">
				<button class="w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-red-900 shadow-md"
					>ELIMINATE</button
				>
				<button class="w-full rounded-lg py-2 text-sm text-gray-300">REPORT</button>
			</div>
		</div>
		<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">YOU</div>
			<div class="mt-3 flex w-full justify-center space-x-2">
				<button class="w-full rounded-lg bg-neutral-800 py-4 text-sm font-bold text-white shadow-md"
					>SHOW CODE</button
				>
			</div>
		</div>
		<div class="mt-4 rounded-lg border-l-8 border-l-blue-600 bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">TODAY</div>
			<div class="text-lg">Wear a hat to stay safe</div>
		</div>
	</div>
</div>
