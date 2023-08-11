<script lang="ts">
    import GridCard from "./GridCard.svelte";
    import SubCard from "./SubCard.svelte"
    import { onMount } from "svelte";

    type restos = {
        ouverture:string[],
        nom:string
    }[]

    let data:restos = []

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/resto-u/index.json')
        data = await response.json()
    })

</script>

<GridCard id="resto" title="Restaurants Universitaire">

    {#each data as resto}
        {#if resto["ouverture"][(new Date()).getDay()] = "000"}
            <SubCard title={resto["nom"]} color="red"> Fermé </SubCard>
        {:else}
            <SubCard title={resto["nom"]} color="Ouvert"> Ouvert </SubCard>
        {/if}
    {/each}
</GridCard>
