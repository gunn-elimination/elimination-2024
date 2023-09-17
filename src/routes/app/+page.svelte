<script lang="ts">
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { clickOutside } from '$lib/utils/clickOutside.js';
	import { Icon, Clipboard, ClipboardDocumentCheck, XMark } from 'svelte-hero-icons';
	import { page } from '$app/stores';

	export let data;
	let { playerData, killCode, targetData } = data;
	$: ({ playerData, killCode, targetData } = data);

	let showKillCode = false;

	const generateQRCode = (node: HTMLCanvasElement) => {
		QRCode.toCanvas(
			node,
			`${$page.url.origin}/api/game/eliminatetarget?code=${killCode}`,
			{ width: 208 },
			(error: any) => {
				if (error) console.error(error);
			}
		);
	};

	let clipboardIcon = Clipboard;
	let copyButtonClass = 'bg-neutral-800 text-neutral-400 hover:bg-neutral-600 ';
	let copyText = killCode!;
	const copyKillCode = () => {
		navigator.clipboard.writeText(killCode!);
		clipboardIcon = ClipboardDocumentCheck;
		copyButtonClass = 'bg-green-100 text-green-900 hover:bg-green-100';
		copyText = 'Copied!';
		setTimeout(() => {
			clipboardIcon = Clipboard;
			copyButtonClass = 'bg-neutral-800 text-neutral-400';
			copyText = killCode!;
		}, 1500);
	};
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>
	{#if showKillCode}
		<div
			class="fixed z-20 flex h-screen w-screen items-center justify-center bg-neutral-900/60 px-10"
		>
			<div
				class="relative flex w-96 flex-col items-center justify-center rounded-lg bg-neutral-700 px-16 py-16 shadow-xl"
				use:clickOutside
				on:clickoutside={() => {
					showKillCode = false;
				}}
			>
				<button class="absolute right-0 top-0 m-4" on:click={() => (showKillCode = false)}
					><Icon src={XMark} class="h-6 w-6" /></button
				>
				<div class="text-2xl font-bold">Your Code</div>
				<canvas use:generateQRCode class="mt-4 rounded-lg" />
				<button
					class="mt-4 flex w-52 justify-between rounded-lg px-6 py-3 text-xl {copyButtonClass}"
					on:click={copyKillCode}
				>
					{copyText}
					<Icon src={clipboardIcon} class="h-6 w-6" />
				</button>
			</div>
		</div>
	{/if}
	<div class="p-8">
		<div class="text-3xl text-white">Target</div>
		<div class="mt-8 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-300">{targetData.studentID}</div>
			<div class="text-3xl">{targetData.name}</div>
			<div class="mt-6 flex w-full justify-center space-x-2">
				<button class="w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-red-900 shadow-md"
					>ELIMINATE</button
				>
				<button class="w-full rounded-lg py-2 text-sm text-gray-300">REPORT</button>
			</div>
		</div>
		<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">YOU</div>
			<button
				class="mt-3 w-full rounded-lg bg-neutral-800 py-4 text-sm font-bold text-white shadow-md"
				on:click={() => (showKillCode = true)}>SHOW CODE</button
			>
		</div>
		<div class="mt-4 rounded-lg border-l-8 border-l-blue-600 bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">TODAY</div>
			<div class="text-lg">Wear a hat to stay safe</div>
		</div>
	</div>
</div>
