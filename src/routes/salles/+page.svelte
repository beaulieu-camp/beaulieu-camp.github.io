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

    function stringify_date(time){
        if (time == undefined) return 'updating';

        let date = new Date(time)
        
        return `jusqu'au ${date.getDate()}/${date.getMonth()+1} à ${date.getHours()}:${date.getMinutes()}`
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
        <Card title={salle} link={null}>
            {#if salles[salle]["state"] == true }
                <span class="green">
                    Libre
                    {stringify_date(salles[salle]["until"])}
                </span>
            {:else if salles[salle]["state"] == false }
                <span class="red">
                    Occupé
                    {stringify_date(salles[salle]["until"])}
                </span>
            {:else}
                <span>
                    {stringify_date(salles[salle]["until"])}
                </span>
            {/if} 
        </Card>
    {/each}


    <style>
        span {
            width: 100%;
            text-align: center;
        }

        span.green {
            color: rgb(26, 196, 77)
        }

        span.red {
            color: rgb(204, 13, 13)
        }
    </style>