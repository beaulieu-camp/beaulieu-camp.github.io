<script lang="ts">
    import Card from "./Card.svelte"
    import { onMount } from "svelte";

    let data = []

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/resto-u/index.json')
        data = await response.json()
    })

</script>

<Card title="Restorants Universitaire" taille="square">
    <table>
        {#each data as resto}
            <tr><td colspan="7">{resto["nom"]}</td></tr>
            <tr>
                {#each resto["ouverture"] as ouv }
                    <td>
                        {#if ouv = "000"}
                            ❌
                        {:else}
                            ✅
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
</Card>



<style>

</style>