<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import SubCard from "./SubCard.svelte";

    let data =  []

    onMount(async() => {
        const response = await fetch('https://beaulieu-camp.github.io/star/index.json')
        data = await response.json()
    })

    function date_parse(date_string) {
        let date = new Date(date_string)
        return `${date.getHours()}:${date.getMinutes()}`
    }
</script>

<Card title="Réseau Star" taille="square">

    {#each Object.values(data) as item}
        <SubCard title={item.nom} color="">
            {#each item.dessertes as bus}
                <table>
                    <td>{bus[1]}</td>
                    <td>{date_parse(bus[2])}</td>
                    <td>{bus[3]}</td>
                </table>
            {/each}
        </SubCard>
    {/each}

</Card>