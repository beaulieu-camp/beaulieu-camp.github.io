<script lang="ts">

	export let annee:String
	export let description:String
	export let date:number
	export let specialites:String[]

</script>

<div style="--color:var(--{annee.replace(" ","")})">

	<h1>{annee}</h1>
	<h2>{specialites}</h2>
	<p class="desc">{description}</p>
	<p class="date">{new Date(date).toLocaleDateString()}</p>
</div>

<style>
:root {
	--PrépaL2 : #6da525;
	--PrépaL1 : #c5f800;
	--ESIR1 :   #f7d100;
	--ESIR2 :   #fe9e00;
	--ESIR3 :   #de4700;
}

div {
	background-color: var(--color);
	padding:16px;
	border-radius: 16px;

	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	grid-column-gap: 0px;
	grid-row-gap: 0px;

	user-select: none;
}

div > h1 { grid-area: 1 / 1 / 2 / 2; }
div > h2 { grid-area: 2 / 1 / 3 / 3; }
div > p.date { grid-area: 1 / 2 / 2 / 3;text-align: right; }
div > p.desc { grid-area: 3 / 1 / 4 / 3; }


h1,h2,p {
	margin : 0;
}
</style>