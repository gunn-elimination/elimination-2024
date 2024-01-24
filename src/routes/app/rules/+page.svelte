<script>
	import Container from '$lib/components/Container.svelte';
	import YoutubeIcon from '$lib/icons/YoutubeIcon.svelte';
</script>

<Container class="">
	<h1 class="mb-8 text-3xl">Rules</h1>
	<div class="flex flex-col items-start justify-center space-y-4">
		<a
			class="w-full rounded-lg bg-neutral-700 px-4 py-2 text-center font-bold shadow-lg md:w-auto"
			href="https://docs.google.com/document/d/1hVzXL1SsPiucapmx3-DCVyd8zRgJaDpWrZHDbUM1K3w/edit?usp=sharing"
			target="_blank">RULES AND CALENDAR</a
		>
		<!-- <a
			class="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-600/20 px-4 py-2 text-center font-bold shadow-lg md:w-auto"
			href=""
		>
			<div>HOW TO PLAY</div>
			<svelte:component this={YoutubeIcon} />
		</a> -->
	</div>
</Container>
