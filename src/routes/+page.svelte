<script>
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="flex h-screen w-screen items-center justify-center p-6">
	<div class="mx-6 flex flex-col items-center justify-center">
		<h1 class="mb-14">
			<div class="font-advent text-6xl text-zinc-500 max-md:text-4xl">welcome to</div>
			<div
				class="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text font-saira text-8xl font-bold text-transparent max-md:text-6xl"
			>
				Gunn Elimination
			</div>
		</h1>
		<div
			class="relative -right-6 flex flex-row-reverse items-baseline justify-end gap-7 self-end text-2xl max-md:-right-[2.3rem] max-md:self-start max-md:text-xl"
		>
			<a
				href="/login"
				class="-home-play group relative border-[1px] border-red-600 px-6 py-2 before:absolute before:bottom-0 before:right-0 before:-z-20 before:h-full before:w-4 before:border-b-[1px] before:border-r-[1px] before:border-red-900/40 before:border-opacity-0 before:transition-all after:absolute after:left-4 after:top-[1.8rem] after:-z-10 after:h-7 after:w-0 after:bg-rose-400/10 after:transition-all hover:border-red-600/50 hover:before:-bottom-10 hover:before:right-12 hover:before:h-screen hover:before:w-screen hover:before:border-opacity-100 hover:after:w-[140%]"
			>
				<span class="font-poiret font-semibold text-zinc-100/80 group-hover:text-zinc-100">
					Play!
				</span>
			</a>
			<a
				href="/about"
				class="-home-about relative border-l-[1px] border-t-[1px] border-zinc-600 px-6 py-2 text-right font-poiret font-semibold text-zinc-600 before:pointer-events-none before:absolute before:-bottom-[1.25rem] before:right-[6.7rem] before:h-10 before:w-3 before:border-b-[1px] before:border-r-[24px] before:border-zinc-500 before:duration-150 hover:border-zinc-400 hover:text-zinc-700/70 hover:before:-bottom-6 hover:before:-right-10 hover:before:h-28 hover:before:w-16 hover:before:border-r-[1px] hover:before:border-zinc-300 hover:before:transition-all max-md:before:right-24 max-md:before:border-r-[16px]"
			>
				About
			</a>
		</div>
	</div>
</div>
<div
	class="pointer-events-none absolute left-[35%] top-[80%] -z-[99] select-none font-saira text-6xl text-gray-800/20 max-md:text-3xl"
>
	<nobr>
		<span class="mr-8 max-md:mr-4">&gt;</span>
		<span class="line-through">950XXXXX</span>
	</nobr>
</div>
<Footer />
