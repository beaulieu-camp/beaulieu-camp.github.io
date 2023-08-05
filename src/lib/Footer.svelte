<script lang="ts">
    import Icons from "$lib/Icons.svelte"
</script>

<footer>
	<a href="https://discord.gg/4T6CnF2qDF"><Icons name="discord"/></a>
	<a href="https://github.com/beaulieu-camp"><Icons name="github"/></a>
	<h4>Made with ❤️ by <a href="https://www.aquabx.ovh">AquaBx</a></h4>
	<h4><a href="/infos">Mentions légales</a></h4>
</footer>

<style>
	
	footer {
		display: flex;
		width: 100%;
		gap:2em;
		justify-content: center;
		align-items: center;
		position: static;
		bottom: 0;
	}

</style>