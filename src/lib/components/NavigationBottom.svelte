<script>
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import LeaderboardIcon from '$lib/icons/LeaderboardIcon.svelte';
	import RulesIcon from '$lib/icons/RulesIcon.svelte';
	import ProfileIcon from '$lib/icons/ProfileIcon.svelte';

	let navigation = [
		{ to: '/app', icon: HomeIcon, text: 'Home' },
		{ to: '/app/leaderboard', icon: LeaderboardIcon, text: 'Leaderboard' },
		{ to: '/app/rules', icon: RulesIcon, text: 'Rules' },
		{ to: '/app/profile/@me', icon: ProfileIcon, text: 'Profile' }
	];
</script>

<div
	class="fixed bottom-0 z-10 flex w-full justify-around border-t border-t-neutral-700 bg-neutral-800"
>
	{#each navigation as item}
		<a
			href={item.to}
			class="flex w-full flex-col items-center justify-center space-y-1 rounded-lg p-4 text-gray-300 hover:bg-gray-600/20"
		>
			<svelte:component this={item.icon} />
			<!-- <span class="text-xs font-light text-gray-400">{item.text}</span> -->
		</a>
	{/each}
</div>
