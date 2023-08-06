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

<header>
	<a href="/">Beaulieu'Camp</a>
</header>

{#key data.pathname}
	<div class="portfolio" in:customScale={{ duration: 750}}  >
		<slot></slot>
	</div>
{/key}

<Footer/>

<style>

	header {
		text-align: center;
		font-size: 2.25rem;
		font-weight: bold;
		margin: 16px 0 ;
	}

	.portfolio {
		column-width: 350px;
		column-gap: 16px;
		max-width: 1178px;
		margin: auto ;
		min-height: calc( 100vh - 184px );
	}
	
</style>