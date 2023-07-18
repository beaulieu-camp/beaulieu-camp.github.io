<script>
	import '../app.css';
	export let data
    import { cubicOut } from 'svelte/easing';
	function customScale(node, options) {
        return {
            duration: options.duration,
			easing: cubicOut,
            css: t => `opacity:${t};transform:scaleY(${t/10+0.9}); transform-origin: top;`
        }
    }   
</script>

<h1><a href="/">Beaulieu'niv</a></h1>

{#key data.pathname}
	<div class="portfolio" in:customScale={{ duration: 750}}  >
		<slot></slot>
	</div>
{/key}

<h3>Made with ❤️ by <a href="https://www.aquabx.ovh">AquaBx</a></h3>
<h3><a href="/infos">Mentions légales</a></h3>

<style>

	a[href] {
		all:unset;
		cursor: pointer;
		transition: 0.3s;
	}

	a[href]:hover {
		opacity: 0.5;
	}

	a:visited{
		all:unset;
	}

	h1,h3 {

		text-align: center;
		
	}	
	
	.portfolio {
		column-width: 20rem;
		column-gap: 1em;
		max-width: 70rem;
		margin: auto ;
		min-height: calc( 100% - 6.625rem);
	}
	
</style>