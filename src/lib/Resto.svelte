<script lang="ts">
    import Card from "./Card.svelte"
    import { onMount } from "svelte";

    let data = []

    onMount(async()=>{
        const response = await fetch('api/resto')
        data = await response.json()
    })

</script>

<Card title="Resto U Beaulieu">
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


    div {
        flex:1;
        display: flex;
        flex-direction: column;

        text-align: left;
    }


</style>