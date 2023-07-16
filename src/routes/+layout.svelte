<script>
	import '../app.css';
</script>


<h1>Beaulieu'niv</h1>

<div>
	<slot></slot>
</div>


<style>
	h1 {
		color: white;
	}
    div {
        display: flex;
        flex-direction: column;
        gap:2em;
    }
</style>