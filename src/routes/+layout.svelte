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




{#key data.pathname}
<div class="page" in:customScale={{ duration: 750}}  >
	<header>
		Bienvenue 🙂
	</header>
	<slot></slot>
</div>
{/key}

<Footer/>
<Dialog></Dialog>



<style>

	header {
		text-align: left;
		font-size: 2.25rem;
		font-weight: bold;
		margin-left: 32px;
	}
	
	.page {
		overflow: hidden overlay;
		position: relative;
		padding: 32px 0 128px 0;
		width: 100%;
	}
	
</style>