<script>
	import '../app.css';
</script>


<h1><a href="/">Beaulieu'niv</a></h1>

<div class="portfolio">
	<slot></slot>
</div>

<h3>Made with ❤️ by <a href="https://www.aquabx.ovh">AquaBx</a></h3>

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
		color: white;
	}

	h1,h3 {
		color: white;
		text-align: center;
		
	}
    /* div {
        display: flex;
        flex-direction: column;
        gap:2em;
		margin: auto;
    } */
	
	
	.portfolio {
		column-width: 20rem;
		column-gap: 1em;
	}
	



</style>