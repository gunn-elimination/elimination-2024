<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import logo from '$lib/assets/images/icons/logo.png';

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
	<form
		class="flex w-96 flex-col items-center justify-center rounded-lg bg-neutral-700 p-8 shadow-xl md:p-16"
		on:submit|preventDefault={handleSubmit}
	>
		<img src={logo} alt="Gunn Elimination Logo" class="h-24" />
		<h1 class="mb-8 mt-4 text-3xl font-bold">Gunn Elimination</h1>
		{#if !success}
			<input
				class="w-full rounded-lg bg-neutral-800 px-6 py-3 text-lg tracking-wider text-neutral-300 shadow-md outline-none"
				name="email"
				placeholder="PAUSD Email"
				bind:value={email}
			/>
			<button
				class="mt-4 w-full rounded-lg bg-black px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-neutral-900"
				>Log in / Sign up</button
			>
			{#if errorMessage !== ''}
				<div class=" mt-2 rounded-lg px-4 py-2 text-center text-lg text-red-500">
					Error: {errorMessage}
				</div>
			{/if}
		{:else}
			<div class="w-full rounded-lg bg-neutral-800 p-2 text-center text-lg text-neutral-300">
				Check your PAUSD email for "Your Magic Link"
			</div>
			<a href="https://gmail.com" class="mt-4 w-full rounded-lg bg-red-600 p-2 text-center text-lg"
				>Open Gmail</a
			>
		{/if}
	</form>
</Container>
<Footer />
