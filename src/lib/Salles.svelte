<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import { salleEvents,salleLibres,getSalles } from "salles_module";


    let date = (new Date).getDate()
    $: salles = {}

    function stringify_date(time){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return `jusqu'au ${date.getDate()}/${date.getMonth()+1} à ${date.getHours()}:${date.getMinutes()}`
    }

    onMount( async() => {


        for (let salle of await getSalles()) {

            let code = salle[2]
            let date = 1662981301 //parseInt(Date.now()/1000)

            salles[ code ] = await salleLibres(code,date)

            salles[ code ]["batiment"] = salle[0]
            salles[ code ]["salle"] = salle[1]

        }

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