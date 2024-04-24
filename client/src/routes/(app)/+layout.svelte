<script lang="ts">
	import '../../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
</script>

<svelte:head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<!-- google font link -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Chau+Philomene+One:ital@0;1&family=Dosis:wght@200..800&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
		rel="stylesheet"
	/>
	<title>Toys - eCommerce Website</title>
</svelte:head>

<Header />

<main class="container">
	<slot />
</main>

<Footer />
