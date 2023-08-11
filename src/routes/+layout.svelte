<script lang="ts">
	import Dialog from "$lib/Dialog.svelte";

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


	<header>
		{data.name == "Accueil" ? "Bienvenue 🙂" : data.name}
	</header>


{#key data.pathname}
<div class="page" in:customScale={{ duration: 750}}  >
	<slot></slot>
</div>
{/key}
  
</main>

<Footer/>
<Dialog></Dialog>


<style>
  main {
		display:flex;
    min-height:calc( 100svh - 96px );
    flex-direction:column;
    padding: 16px 0 80px 0;
		gap:16px;
  }
  header {
		text-align: left;
		font-size: 2.25rem;
		font-weight: bold;
		margin-left: 32px;
	}
	
	.page {
		overflow: hidden overlay;
		position: relative;
		width: 100%;
    flex:1;
	}
	
</style>