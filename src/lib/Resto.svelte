<script lang="ts">
    import Card from "./Card.svelte"
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

<Card title="Restorants Universitaire" taille="square">

    {#each data as resto}
        {#if resto["ouverture"][(new Date()).getDay()] = "000"}
            <SubCard title={resto["nom"]} color="red"> Fermé </SubCard>
        {:else}
            <SubCard title={resto["nom"]} color="Ouvert"> Ouvert </SubCard>
        {/if}
    {/each}
</Card>
