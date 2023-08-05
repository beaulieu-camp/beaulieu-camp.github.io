<script>
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

<h1><a href="/">Beaulieu'Camp</a></h1>

{#key data.pathname}
	<div class="portfolio" in:customScale={{ duration: 750}}  >
		<slot></slot>
	</div>
{/key}

<Footer/>

<style>

	h1 {
		text-align: center;
	}	

	.portfolio {
		column-width: 20rem;
		column-gap: 1em;
		max-width: 70rem;
		margin: auto ;
		min-height: calc( 100vh - 9.9rem);
	}
	
</style>