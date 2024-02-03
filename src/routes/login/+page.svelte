<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import logo from '$lib/assets/images/icons/logo.png';
	import { onMount } from 'svelte';

	export let data;
	let { supabase, url, killcode } = data;
	$: ({ supabase, url, killcode } = data);

	let loaded = false;

	onMount(() => {
		if (killcode) {
			localStorage.setItem('loginkillcode', killcode);
		}

		loaded = true;
	});

	const handleGoogleAuth = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${url}/api/auth/callback`, // potentially add killcode when logging in (after scanning qr code)
				scopes: 'openid profile email',
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
					hd: 'pausd.us'
				}
			}
		});
	};
</script>

<div class="absolute -z-30 h-full w-[30%] bg-zinc-950/70" />
<div class="flex h-full w-screen items-center justify-center overflow-hidden">
	<form
		class="relative flex w-96 flex-col items-center justify-center bg-neutral-800/50 px-6 pb-16 pt-14 after:absolute after:-top-24 after:left-64 after:-z-50 after:h-[29rem] after:w-[20rem] after:bg-red-500/30"
		on:submit|preventDefault={handleGoogleAuth}
	>
		<img src={logo} alt="Gunn Elimination Logo" class="h-24" />
		<h1 class="mt-4 font-saira text-3xl font-bold text-zinc-200">Gunn Elimination</h1>
		<div
			class="relative mt-4 p-2 before:pointer-events-none before:absolute before:-left-[20rem] before:top-[5.5rem] before:-z-40 before:h-[20rem] before:w-[40rem] before:border-l-[1px] before:border-t-[1px] before:border-zinc-500 before:transition-all after:pointer-events-none after:absolute after:bottom-[10rem] after:right-[20rem] after:-z-40 after:h-[14rem] after:w-[30rem] after:border-b-[1px] after:border-r-[1px] after:border-zinc-500 after:transition-all max-md:before:left-0 max-md:before:top-0 max-md:after:bottom-0 max-md:after:right-0 max-md:after:h-[10rem] [&:has(.-login:hover)]:before:-left-0 [&:has(.-login:hover)]:before:-top-0 [&:has(.-login:hover)]:before:h-[40rem] [&:has(.-login:hover)]:before:w-[8rem] [&:has(.-login:hover)]:after:-bottom-0 [&:has(.-login:hover)]:after:-right-0 [&:has(.-login:hover)]:after:h-[40rem] [&:has(.-login:hover)]:after:w-full"
		>
			<button
				class="-login relative px-8 py-4 font-poiret text-xl font-semibold text-zinc-300 before:absolute before:bottom-0 before:left-0 before:h-4 before:w-full before:border-b-[1px] before:border-l-[1px] before:border-zinc-600 after:absolute after:right-0 after:top-0 after:h-full after:w-11 after:border-r-[1px] after:border-t-[1px] after:border-zinc-600 hover:bg-red-800/20 hover:text-zinc-100 hover:before:border-zinc-100 hover:after:border-zinc-100 disabled:bg-black/20"
				disabled={!loaded}
			>
				{loaded ? 'Login \\ Sign Up' : 'Loading...'}
			</button>
		</div>
	</form>
</div>
<Footer />
