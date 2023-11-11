<script>
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import LeaderboardIcon from '$lib/icons/LeaderboardIcon.svelte';
	import RulesIcon from '$lib/icons/RulesIcon.svelte';
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import logo from '$lib/assets/images/icons/logo.png';

	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';

	export let data;
	let { supabase, session, playerData } = data;
	$: ({ supabase, session, playerData } = data);

	let navigation = [
		{ to: '/app', icon: HomeIcon, text: 'Home' },
		{ to: '/app/leaderboard', icon: LeaderboardIcon, text: 'Leaderboard' },
		{ to: '/app/rules', icon: RulesIcon, text: 'Rules' },
		{ to: '/app/profile/@me', icon: ProfileIcon, text: 'Profile' }
	];

	onMount(() => {
		if (playerData.role === 'Admin') {
			navigation = [...navigation, { to: '/app/admin', icon: SettingsIcon, text: 'Admin' }];
		}
	});
</script>

<!-- Desktop Sidebar -->
<div class="hidden h-full rounded-lg lg:flex">
	<div class="space-y-4 rounded-sm bg-neutral-900 px-4 shadow-md">
		<div class="mt-8 rounded-lg px-4 py-4 text-xl font-bold">
			<a class="flex items-center justify-center space-x-2" href="/app">
				<img src={logo} alt="logo" width={40} height="40" />
				<div>Gunn Elimination</div></a
			>
		</div>
		{#each navigation as item}
			<a
				href={item.to}
				class="flex w-full items-center justify-center space-x-4 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-600/20"
			>
				<svelte:component this={item.icon} />
				<div class="flex-1 text-lg">{item.text}</div>
			</a>
		{/each}
	</div>
	<div class="flex-1 overflow-x-hidden overflow-y-scroll">
		<slot />
	</div>
</div>

<!-- Mobile Bottom Navbar -->
<div class="lg:hidden">
	<slot />

	<div
		class="fixed bottom-0 z-10 flex w-full justify-around border-t border-t-neutral-700 bg-neutral-800"
	>
		{#each navigation as item}
			<a
				href={item.to}
				class="flex w-full flex-col items-center justify-center space-y-1 rounded-lg p-4 text-gray-300 hover:bg-gray-600/20"
			>
				<svelte:component this={item.icon} />
			</a>
		{/each}
	</div>
</div>
