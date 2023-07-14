<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import logo from '$lib/assets/images/logo.png';

	export let data;
	let { supabase, url } = data;
	$: ({ supabase, url } = data);

	let email = '';
	let errorMessage = '';
	let success = false;

	const handleSubmit = async () => {
		let regex = /^[a-z][a-z]\d{5}@pausd\.us$/i; // Regex for PAUSD emails
		if (regex.test(email)) {
			const { data, error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: `${url}/api/auth/callback`
				}
			});

			if (error) errorMessage = error.message;
			else success = true;
		} else {
			errorMessage = 'Please use a valid PAUSD student email';
		}
	};
</script>

<Container class="flex h-full w-screen items-center justify-center">
	<form class="flex w-80 flex-col items-center justify-center rounded-lg" on:submit={handleSubmit}>
		<img src={logo} alt="Gunn Elimination Logo" class="h-32 w-32" />
		<h1 class="mb-8 text-4xl">Welcome</h1>
		{#if !success}
			<input
				class="w-full rounded-lg bg-transparent px-6 py-3 text-lg tracking-wider text-gray-300 outline outline-1 outline-gray-500 focus:outline-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				placeholder="PAUSD Email"
				bind:value={email}
			/>
			<button
				class="mt-4 w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white hover:bg-primary/90"
				>Log in / Sign up</button
			>
			{#if errorMessage !== ''}
				<div class=" mt-4 text-center text-lg text-primary">Error: {errorMessage}</div>
			{/if}
		{:else}
			<div class="text-center text-lg">
				Please check your email for a signin link (from Supabase). You may close this page.
			</div>
		{/if}
	</form>
</Container>
<Footer />
