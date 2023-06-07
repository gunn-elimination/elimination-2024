<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
</script>

<div class="flex h-screen w-screen flex-col">
	<slot />
	<Footer />
</div>
