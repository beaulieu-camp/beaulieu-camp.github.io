<script lang="ts">
    import GridCard from "./GridCard.svelte"
    import SubCard from "./SubCard.svelte"
    import { onMount } from "svelte";

    type bus = {
        ouverture:string,
        nom:string
    }[]

    let data:bus = []

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/bu/index.json')
        data = (await response.json())[0]
    })

</script>

<GridCard title="Bibliotèques Universitaire" taille="square">
    {#each data as bu}
        {#if bu["ouverture"] == "Fermé"}
            <SubCard title={bu["nom"]} color="red"> Fermé </SubCard>
        {:else}
            <SubCard title={bu["nom"]} color="Ouvert"> Ouvert </SubCard>
        {/if}
    {/each}
</GridCard>



<style>

</style>