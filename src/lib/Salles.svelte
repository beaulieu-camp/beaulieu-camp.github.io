<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import SubCard from "./SubCard.svelte";
    import { salleEvents,salleLibres,getSalles } from "salles_module";
    import { configuration } from "../includes/store";

    import { created } from "../includes/dialog";

    let config : configuration

    type sallestype = {
        [code:string]:{ error:string,batiment:string,salle:string } | { state:string,until:number,batiment:string,salle:string }
    }            

    let date = (new Date).getDate()
    let salles:sallestype = {}

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return `jusqu'au ${date.toLocaleString('fr')}`
    }

    async function update_salles(){
        salles = await getSalles()
        for (let code of config.get("salles")) {
            let date = Math.floor(Date.now()/1000)
            salles[ code ] = { ...salles[ code ], ...await salleLibres(code,date) }
        }
    }

    onMount( async() => {
        config = new configuration()
        await update_salles()
    })

    async function dialog_call(){
        let allsalles:{id:string,name:string,checked:boolean}[] = []

        for (let code in salles){
            allsalles.push({
                name:`${salles[code]["batiment"]} ${salles[code]["salle"]}`,
                id:code,
                checked : config.get("salles").includes(code)
            })
        }

        let callback =  async (liste:string[]) => {
                            config.set("salles",liste);
                            await update_salles();
                        }

        created.subscribe((value) => {
            value.open(allsalles,callback)
        })

    }

</script>

<Card title="Salles Ouvertes" taille="square" params_callback={dialog_call}>
    <!-- {#if salles}
        Ajoutes des salles a visualisés :)
    {/if} -->
    { #each Object.values(salles) as salle }
        {#if salle.error}
            <SubCard title={salle.batiment + " " + salle.salle} color="red"> {salle.error} </SubCard>
        {:else if salle.state}
            <SubCard title={salle.batiment + " " + salle.salle} color="green"> {salle.state } {stringify_date(salle.until)} </SubCard>
        {/if}
    { /each }
</Card>