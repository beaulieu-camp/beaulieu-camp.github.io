<script lang="ts">
    import Icons from "$lib/Icons.svelte"
</script>

<footer>
	<a href="/"><Icons name="home"/>Home</a>
	<a target="_blank" href="https://discord.gg/xbTnysGgZN"><Icons name="discord"/>Discord</a>
	<a target="_blank" href="https://github.com/beaulieu-camp"><Icons name="github"/>Github</a>
	<a href="/infos"><Icons name="info"/>Infos</a>
	<a href="/settings"><Icons name="settings"/>Settings</a>

</footer>

<style>
	
	footer {
		display: flex;
		width: 100%;
		gap:16px;
		justify-content: center;
		align-items: center;
		margin: 16px 0;
	}

	a {
		display: flex;
		flex-direction: column;align-items: center;
		gap : 8px;
		width: 64px;
	}

</style>