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
	import { invalidateAll } from '$app/navigation';
	import { Confetti } from 'svelte-confetti';
	import { getTodaysChallenge } from '$lib/utils/getTodaysChallenge.js';

	export let data;
	let { playerData, killCode, targetData, leaderboard, gameMessage } = data;
	$: ({ playerData, killCode, targetData, leaderboard, gameMessage } = data);

	/**
	 * TODO: Redirect to login if not logged in and at eliminatetarget
	 */

	// Toggles
	let showKillCode = false;
	let showEliminateModal = false;
	let showQRCodeScanner = false;
	let showConfetti = false;
	let showKillLoadingSpinner = false;

	// User Input
	let inputKillCode = '';

	// Error Message
	let killCodeErrorMessage = '';

	let html5QrCode: Html5Qrcode;

	onMount(async () => {
		const loginkillcode = localStorage.getItem('loginkillcode');
		if (loginkillcode) {
			inputKillCode = loginkillcode;
			await submitCode();
		}
	});

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
		showKillLoadingSpinner = true;
		const req = await fetch(
			`${$page.url.origin}/api/game/eliminatetarget?code=${inputKillCode}&redirect=false`
		);
		const data = await req.json();
		showKillLoadingSpinner = false;
		if (data.error) {
			killCodeErrorMessage = data.error;

			setTimeout(() => {
				killCodeErrorMessage = '';
			}, 3000);
		} else {
			showConfetti = true;
			inputKillCode = '';
			setTimeout(async () => {
				showConfetti = false;
				closeEliminateMenu();
				await invalidateAll(); // refresh on success
			}, 1000);
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
		if (html5QrCode && html5QrCode.isScanning) html5QrCode.stop();
	};
</script>

<div>
	<div class="fixed -z-10 h-screen w-screen">
		<div class="absolute h-48 w-full bg-neutral-900/80" />
		<img src={backgroundImage} alt="background" class="h-48 w-full object-cover object-center" />
	</div>
	{#if showKillCode}
		<div
			class="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-neutral-900/70 px-10"
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
				<div class="mt-2 text-neutral-400">(or type it manually)</div>
			</div>
		</div>
	{/if}
	{#if showEliminateModal}
		<div
			class="fixed left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-neutral-900/70 px-10"
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
						<button
							class="mt-2 w-64 rounded-lg bg-black px-6 py-3 font-bold text-white disabled:bg-neutral-800"
							disabled={showKillLoadingSpinner}
						>
							{#if showKillLoadingSpinner}
								<svg
									class="absolute h-5 w-5 animate-spin text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									/>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							{/if}
							{#if showConfetti}
								<div class="absolute left-0 flex w-full justify-center">
									<Confetti x={[-0.5, 0.5]} y={[0.25, 1]} />
								</div>
							{/if}
							SUBMIT</button
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

	<div class="p-8 lg:flex lg:justify-center">
		<div class="lg:max-w-2xl lg:flex-1">
			{#if gameMessage}
				<div class="mt-10 rounded-lg bg-red-500/90 px-8 py-4 shadow-xl">
					<div class="text-sm text-neutral-300">MESSAGE</div>
					<div class="text-lg">{gameMessage}</div>
				</div>
			{/if}
			<div
				class="{gameMessage
					? 'mt-4'
					: 'mt-10'} rounded-r-lg border-l-8 border-l-blue-600 bg-neutral-700 py-4 pl-6 pr-8 shadow-xl"
			>
				<div class="text-sm text-neutral-400">TODAY</div>
				<div class="text-lg">{getTodaysChallenge()}</div>
			</div>
			<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl lg:flex">
				<div class="lg:w-1/2">
					<div class="text-sm text-neutral-400">TARGET - {targetData.studentID}</div>
					<div class="text-3xl">{targetData.name}</div>
				</div>
				<div class="mt-6 flex w-full items-end justify-center space-x-2 lg:mt-0 lg:w-1/2">
					<button
						class="h-10 w-full rounded-lg bg-red-600 text-sm font-bold text-red-900 shadow-md"
						on:click={() => (showEliminateModal = true)}>ELIMINATE</button
					>
					<button class="h-10 w-full rounded-lg text-sm text-gray-300">REPORT</button>
				</div>
			</div>
			<div class="mt-4 rounded-lg bg-neutral-700 px-8 py-6 shadow-xl">
				<div class="text-sm text-neutral-400">YOU</div>
				<div class="mt-3 flex space-x-3">
					<div
						class="lg:flex-0 flex flex-1 items-center justify-center space-x-2 rounded-lg py-2 shadow-sm outline outline-1 outline-neutral-600 lg:px-6"
					>
						<div class="text-neutral-400">RANK</div>
						<div class=" font-semibold">
							{getRank(leaderboard, playerData.student_id || '')}
						</div>
					</div>
					<div
						class="lg:flex-0 flex flex-1 items-center justify-center space-x-2 rounded-lg py-2 shadow-sm outline outline-1 outline-neutral-600 lg:px-6"
					>
						<div class="text-neutral-400">KILLS</div>
						<div class=" font-semibold">{playerData.kill_arr.length}</div>
					</div>
					<div
						class="lg:flex-0 flex flex-1 items-center justify-center rounded-lg py-2 shadow-sm outline outline-1 outline-neutral-600 lg:px-6"
					>
						{#if playerData.alive}
							<div class="text-lg font-semibold text-green-500">ALIVE</div>
						{:else}
							<div class="text-lg font-semibold text-red-500">DEAD</div>
						{/if}
					</div>
				</div>
				<button
					class="mt-4 w-full rounded-lg bg-neutral-800 py-3 text-sm font-bold text-white shadow-md lg:w-40"
					on:click={() => (showKillCode = true)}>SHOW CODE</button
				>
			</div>
		</div>
	</div>
</div>
