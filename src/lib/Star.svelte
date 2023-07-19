<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";

    let data =  []

    onMount(async() => {
        const response = await fetch('api/star')
        data = await response.json()
    })

    function date_parse(date_string) {
        let date = new Date(date_string)
        return `${date.getHours()}:${date.getMinutes()}`
    }
</script>

<Card title="Réseau Star">

    <table>
        {#each Object.values(data) as item}
            <tr>
                <td colspan="3">{item.nom}</td>
            </tr>
            {#each item.dessertes as bus}
                <tr>
                    <td>{bus[1]}</td>
                    <td>{date_parse(bus[2])}</td>

                    <td>{bus[3]}</td>
                </tr>
            {/each}
        {/each}
    </table>

</Card>