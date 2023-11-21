<script lang="ts">

	import '../app.css';
	export let data

	import Footer from '$lib/Footer.svelte';
    import { cubicOut } from 'svelte/easing';
	function customScale(node, options) {
        return {
            duration: options.duration,
			easing: cubicOut,
            css: t => `opacity:${t};transform:scaleY(${t/10+0.9}); transform-origin: top;`
        }
    }   
</script>

<svelte:head>
	<title>Beaulieu'Camp - {data.pathname}</title>
</svelte:head>

<main>

	<div class="page" in:customScale={{ duration: 750}}  >
		<slot></slot>
	</div>
	<Footer/>

</main>



<style>

	.page{
		width: 100%;
		height: 100%;
		max-height: 100%;
		overflow: auto;
		position: relative;
	}
	main {
		display:flex;
		height:calc( 100svh );
		max-height:calc( 100svh );
		flex-direction:column;
	}
</style>