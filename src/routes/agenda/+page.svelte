<script>
	import {getData} from "./index"
    import { onMount } from "svelte";
    import Card from "./card.svelte";

	let data = []

	onMount(async() => {
		data = await getData()
	})

	let annee = ""
	let spe = ""

</script>



<main>
	<header>Collibri</header>
	<a class="formlink" href="https://forms.gle/B9r1GgaGzKY6xtTJ6">Formulaire</a>
		
		<div class="container">
			<div class="selectboxs">

				<select bind:value={annee}>
					<option value="" default>Tout niveau</option>
					<option value="Prépa L1">Prépa L1</option>
					<option value="Prépa L2">Prépa L2</option>
					<option value="ESIR 1">ESIR 1</option>
					<option value="ESIR 2">ESIR 2</option>
					<option value="ESIR 3">ESIR 3</option>
				</select>
				<select bind:value={spe}>
					<option value="" default="true">Général</option>
					{#if annee.startsWith("ESIR")}
						<option value="TIS">TIS</option>
						<option value="MAT">Matériaux</option>
						{#if annee=="ESIR 1"}
							<option value="TI">TI</option>
						{:else}
							<option value="IN">IN</option>
							<option value="IOT">IOT</option>
							<option value="SI">SI</option>
						{/if}
					
					{/if}
				</select>
			</div>
			{#each data as task} 
			
			{#if task.annee.startsWith(annee) && (spe=="" || task.specialites.includes(spe))}
			<Card annee={task.annee} description={task.description} date={task.date} specialites={task.specialites} ></Card>
			{/if}
		{/each}
	</div>

</main>


<style>
	a.formlink {
		text-align: center;
		font-size: 28px;
		color:hsl(210, 100%, 47%);
		display: block;
		margin: auto;
		margin:16px;
	}
	main{
		width:clamp(0px,100%,500px);
		margin:auto;
		padding:16px;
	}

	main > div.container {
		flex-direction: column;
	}
	div.selectboxs , main > div.container {
		display: flex;
		gap:16px;
	}

	select {
		padding:4px;
		outline: unset;
		flex:1;
		background-color: var(--secondary);
		color:var(--text);
		border-color: var(--text-alt);
	}
</style>