<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import SubCard from "./SubCard.svelte";
    import { salleEvents,salleLibres,getSalles } from "salles_module";


    type sallestype = {
        [code:string]:{ error:string,batiment?:string,salle?:string } | { state:string,until:number,batiment?:string,salle?:string }
    }            


    let date = (new Date).getDate()
    let salles:sallestype = {}

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return `jusqu'au ${date.getDate()}/${date.getMonth()+1} à ${date.getHours()}:${date.getMinutes()}`
    }

    onMount( async() => {


        for (let salle of await getSalles()) {

            let code = salle[2]
            let date = Math.floor(Date.now()/1000)
            salles[ code ] = await salleLibres(code,date)

            salles[ code ]["batiment"] = salle[0]
            salles[ code ]["salle"] = salle[1]
        }

    })

    function color(bool:boolean){
        return bool ? "green" : "red"
    }

</script>

<Card title="Salles Ouvertes" taille="square">

    { #each Object.values(salles) as salle }
        {#if salle.error}
            <SubCard title={salle.batiment + " " + salle.salle} color="yellow"> {salle.error} </SubCard>
        {:else if salle.state}
            <SubCard title={salle.batiment + " " + salle.salle} color="green"> {salle.state } {stringify_date(salle.until)} </SubCard>
        {:else}
            <SubCard title={salle.batiment + " " + salle.salle} color="red"> {salle.state } {stringify_date(salle.until)} </SubCard>
        {/if}
    { /each }
</Card>