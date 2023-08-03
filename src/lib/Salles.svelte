<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";

    let date = (new Date).getDate()
    $: salles = {}

    function stringify_date(time){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return `jusqu'au ${date.getDate()}/${date.getMonth()+1} à ${date.getHours()}:${date.getMinutes()}`
    }

    onMount( async() => {
        salles = await (await import('./salles.ts')).default()
    })

</script>

<Card title="Salles Ouvertes" taille="square">

    <table>
        { #each Object.values(salles) as salle }
            <tr>
                <td>
                    {salle.batiment}
                </td>
                <td>
                    {salle.salle}
                </td>
                <td>
                    {salle.state } {stringify_date(salle.until)}
                </td>
            </tr>   
        { /each }
    </table>
</Card>
    
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