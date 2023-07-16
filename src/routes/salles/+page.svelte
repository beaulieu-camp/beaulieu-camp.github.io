<script lang="ts">
    import Card from "$lib/Card.svelte";
    import { onMount } from "svelte";


    async function fetchSalles(salles,ntime) {
        let data = await fetch('https://api-esir.aquabx.ovh/?salles=' + salles.join(",") +'&type=libres&date=' +ntime);
        return await data.json();
    }

    $: salles = {
        'b42_amphi_l'  : { },
        'b42_amphi_m'  : { },
        'b42_amphi_n'  : { },
        'b41_salle_001': { },
        'b41_salle_002': { },
        'b41_salle_003': { },
        'b41_salle_004': { },
        'b41_salle_101': { },
        'b41_salle_102': { },
        'b41_salle_103': { },
        'b41_salle_104': { }
    }


    onMount( async() => {
        salles = await fetchSalles(Object.keys(salles),1667940180000)
    })

</script>

    <!-- <select>
        <option>Batiment 41</option>
        <option>Batiment 42</option>
    </select>
    <input type="date">
    <input type="time"> -->


    {#each Object.keys(salles) as salle } 
        <Card title={salle}>
            {#if salles[salle]["state"] == true }
                Libre jusqu'à
            {:else if salles[salle]["state"] == false }
                Occupé jusqu'à
            {/if}

            {new Date(salles[salle]["until"])}
        </Card>
    {/each}
