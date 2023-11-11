<script lang="ts">
	import backgroundImage from '$lib/assets/images/backgrounds/gunn-background.jpg';
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import { clickOutside } from '$lib/utils/clickOutside.js';
	import { getRank } from '$lib/utils/getRank.js';
	import { Icon, Clipboard, ClipboardDocumentCheck, XMark } from 'svelte-hero-icons';
	import { page } from '$app/stores';
	import {
		Html5Qrcode,
		Html5QrcodeScanner,
		type QrcodeErrorCallback,
		type QrcodeSuccessCallback
	} from 'html5-qrcode';

	export let data;
	let { playerData, killCode, targetData, leaderboard } = data;
	$: ({ playerData, killCode, targetData, leaderboard } = data);

	/**
	 * TODO: Redirect to login if not logged in and at eliminatetarget
	 */

	// Toggles
	let showKillCode = false;
	let showEliminateModal = false;
	let showQRCodeScanner = false;

	// User Input
	let inputKillCode = '';

	// Error Message
	let killCodeErrorMessage = '';

	let html5QrCode: Html5Qrcode;

	// Generate QR Code for Kill Code
	const generateQRCode = (node: HTMLCanvasElement) => {
		QRCode.toCanvas(
			node,
			`${$page.url.origin}/api/game/eliminatetarget?code=${killCode}&redirect=true`,
			{ width: 256 },
			(error: any) => {
				if (error) console.error(error);
			}
		);
	};

	// Handle Copy to Clipboard
	let clipboardIcon = Clipboard;
	let copyButtonClass = 'bg-neutral-800 text-neutral-400 hover:bg-neutral-600 ';
	let copyText = killCode!;
	const copyKillCode = () => {
		navigator.clipboard.writeText(killCode!);
		clipboardIcon = ClipboardDocumentCheck;
		copyButtonClass =
			'bg-green-100 text-green-900 hover:bg-green-100 focus:ring-2 focus:ring-green-300';
		copyText = 'Copied!';
		setTimeout(() => {
			clipboardIcon = Clipboard;
			copyButtonClass = 'bg-neutral-800 text-neutral-400';
			copyText = killCode!;
		}, 1500);
	};

	// Handle Submitting Kill Code
	const submitCode = async () => {
		const req = await fetch(
			`${$page.url.origin}/api/game/eliminatetarget?code=${inputKillCode}&redirect=false`
		);
		const data = await req.json();
		if (data.error) {
			killCodeErrorMessage = data.error;

			setTimeout(() => {
				killCodeErrorMessage = '';
			}, 3000);
		}
	};

	// Request QR Code Scanner
	const requestQRCodeScanner = () => {
		showQRCodeScanner = true;
		html5QrCode = new Html5Qrcode('reader');

		const qrCodeSuccessCallback: QrcodeSuccessCallback = (decodedText, decodedResult) => {
			const url = new URL(decodedText);
			console.log(url);
			if (url.origin === $page.url.origin) {
				inputKillCode = url.searchParams.get('code')!;
				submitCode();
				showQRCodeScanner = false;
				html5QrCode.stop();
			}
		};
		const qrCodeErrorCallback: QrcodeErrorCallback = (decodedText, decodedResult) => {
			/* handle error */
		};
		const config = { fps: 10, qrbox: { width: 250, height: 250 } };

		html5QrCode
			.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback, qrCodeErrorCallback)
			.catch((err) => console.error(err));
	};

	const closeEliminateMenu = () => {
		showEliminateModal = false;
		showQRCodeScanner = false;
		if (html5QrCode.isScanning) html5QrCode.stop();
	};
</script>

<div>
	<div class="fixed -z-10 h-screen w-full">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>
	{#if showKillCode}
		<div
			class="fixed z-20 flex h-screen w-screen items-center justify-center bg-neutral-900/70 px-10"
		>
			<div
				class="relative flex w-96 flex-col items-center justify-center rounded-lg bg-neutral-700 px-8 py-8 shadow-xl"
				use:clickOutside
				on:clickoutside={() => {
					showKillCode = false;
				}}
			>
				<button class="absolute right-0 top-0 m-4" on:click={() => (showKillCode = false)}
					><Icon src={XMark} class="h-6 w-6" /></button
				>
				<div class="text-2xl text-neutral-100">Your Kill Code</div>
				<div class="text-neutral-300">Show this if you are eliminated</div>
				<canvas use:generateQRCode class="mt-4 rounded-lg" />
				<button
					class="mt-4 flex w-64 justify-between rounded-lg px-6 py-3 text-xl {copyButtonClass}"
					on:click={copyKillCode}
				>
					{copyText}
					<Icon src={clipboardIcon} class="h-6 w-6" />
				</button>
			</div>
		</div>
	{/if}
	{#if showEliminateModal}
		<div
			class="fixed z-20 flex h-screen w-screen items-center justify-center bg-neutral-900/70 px-10"
		>
			<div
				class="relative flex w-96 flex-col items-center justify-center rounded-lg bg-neutral-700 px-8 py-8 shadow-xl"
				use:clickOutside
				on:clickoutside={closeEliminateMenu}
			>
				<button class="absolute right-0 top-0 m-4" on:click={closeEliminateMenu}
					><Icon src={XMark} class="h-6 w-6" /></button
				>
				{#if !showQRCodeScanner}
					<div class="mt-2 text-center text-2xl text-neutral-100">
						Eliminate
						{targetData.name}
					</div>
					<form
						on:submit|preventDefault={submitCode}
						class="flex flex-col items-center justify-center"
					>
						<input
							class="mt-4 w-64 rounded-lg bg-neutral-800 px-6 py-3"
							placeholder="CODE"
							bind:value={inputKillCode}
						/>
						<button class="mt-2 w-64 rounded-lg bg-black px-6 py-3 font-bold text-white"
							>SUBMIT</button
						>
					</form>
					{#if killCodeErrorMessage !== ''}
						<div class="w-full py-2 text-center text-lg text-red-500">{killCodeErrorMessage}</div>
					{/if}
					<button
						class="mt-1 rounded-lg px-6 py-3 font-semibold text-neutral-400"
						on:click={requestQRCodeScanner}>Scan QR Code</button
					>
				{/if}
				<div id="reader" class="w-full" />
			</div>
		</div>
	{/if}

	<div class="p-8">
		<div
			class="mt-10 rounded-lg border-l-[12px] border-l-blue-600 bg-neutral-700 px-8 py-4 shadow-xl"
		>
			<div class="text-sm text-neutral-400">TODAY</div>
			<div class="text-lg">Wear a hat to stay safe</div>
		</div>
		<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-300">TARGET</div>
			<div class="text-3xl">{targetData.name}</div>
			<div class="mt-6 flex w-full justify-center space-x-2">
				<button
					class="w-full rounded-lg bg-red-600 py-2 text-sm font-bold text-red-900 shadow-md"
					on:click={() => (showEliminateModal = true)}>ELIMINATE</button
				>
				<button class="w-full rounded-lg py-2 text-sm text-gray-300">REPORT</button>
			</div>
		</div>
		<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
			<div class="text-sm text-neutral-400">YOU</div>
			<div class="mt-3 flex justify-between space-x-3">
				<div
					class="flex flex-1 flex-col items-center justify-center rounded-lg bg-neutral-600 py-2"
				>
					<div>RANK</div>
					<div>{getRank(leaderboard, playerData.student_id || '')}</div>
				</div>
				<div
					class="flex flex-1 flex-col items-center justify-center rounded-lg bg-neutral-600 py-2"
				>
					<div>KILLS</div>
					<div>{playerData.kill_arr.length}</div>
				</div>
				<div
					class="flex flex-1 flex-col items-center justify-center rounded-lg bg-neutral-600 py-2"
				>
					{#if playerData.alive}
						<div class="text-lg font-semibold text-green-500">ALIVE</div>
					{:else}
						<div class="text-lg font-semibold text-red-500">DEAD</div>
					{/if}
				</div>
			</div>
			<button
				class="mt-3 w-full rounded-lg bg-neutral-800 py-4 text-sm font-bold text-white shadow-md"
				on:click={() => (showKillCode = true)}>SHOW CODE</button
			>
		</div>
	</div>
</div>
