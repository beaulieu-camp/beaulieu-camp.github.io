<script lang="ts">
    import Icons from "$lib/Icons.svelte"
</script>

<footer>
	<a href="/"><Icons name="home"/>Home</a>
	<a target="_blank" href="https://discord.gg/4T6CnF2qDF"><Icons name="discord"/>Discord</a>
	<a target="_blank" href="https://github.com/beaulieu-camp"><Icons name="github"/>Github</a>
	<a href="/infos"><Icons name="info"/>Infos</a>

</footer>

<style>
	
	footer {
		display: flex;
		width: 100%;
		gap:2em;
		justify-content: center;
		align-items: center;
		margin: 1em 0;
	}

	a {
		display: flex;
		flex-direction: column;align-items: center;
		gap : 0.3em;
		width: 4em;
	}

</style>