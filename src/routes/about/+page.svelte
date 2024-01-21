<script>
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Container class="h-full w-screen">
	<h1 class="mt-16 text-center text-4xl lg:text-5xl">
		<div>About</div>
	</h1>
	<div class="mt-4 flex flex-col space-y-4 text-center text-neutral-300">
		<div>
			Gunn Elimination is a school-wide, competitive game of tag where each player is assigned a
			target to find and eliminate. Each day, there are different rules players can follow to be
			safe.
		</div>
		<a
			href="https://docs.google.com/document/d/1hVzXL1SsPiucapmx3-DCVyd8zRgJaDpWrZHDbUM1K3w/edit?usp=sharing"
			target="_blank"
			class="rounded-lg px-4 py-2 underline hover:text-neutral-400">All Rules and Game Calendar</a
		>
	</div>
</Container>
<Footer />
