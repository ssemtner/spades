<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<main>
	<Header />
	<slot></slot>
</main>

<style>
    main {
        min-height: 100vh;
				overflow-x: hidden	;
    }
</style>
