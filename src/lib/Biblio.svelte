<script lang="ts">
    import Card from "./Card.svelte"
    import { onMount } from "svelte";

    let data = []

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/bu/index.json')
        data = (await response.json())[0]
    })

</script>

<Card title="Bibliotèques Universitaire" taille="third">
    <table>
        {#each data as bu}
            <tr>
                <td colspan="7">{bu["nom"]}</td>
                <td>{bu["ouverture"]}</td>
            </tr>
        {/each}
    </table>
</Card>



<style>

</style>