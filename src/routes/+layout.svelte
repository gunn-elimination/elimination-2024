<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/images/favicon.ico';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Gunn Elimination</title>
	<link rel="icon" type="image/x-icon" href={favicon} />
</svelte:head>

<div class="flex h-screen w-screen flex-col">
	<slot />
</div>
