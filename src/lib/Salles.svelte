<script lang="ts">
    import { onMount } from "svelte";
    import GridCard from "./GridCard.svelte";
    import SubCard from "./SubCard.svelte";
    import { salleLibres,getSalles } from "salles_module";
    import { configuration } from "../includes/configuration";

    import { created } from "../includes/dialog";

    let config : configuration

    type sallestype = {
        [code:string]:{ error:string,batiment:string,salle:string } | { state:string,until:number,batiment:string,salle:string }
    }            

    let date = (new Date).getDate()
    let data : sallestype = {}
    let salles : sallestype = {}


    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return date.toLocaleString('fr')
    }

    async function update_salles(){
        data = {}
        for (let code of config.get("salles")) {
            let date = Math.floor(Date.now()/1000)
            data[ code ] = { ...salles[ code ], ...await salleLibres(code,date) }
            console.log(code,Date.now()/1000,data[ code ])
        }
    }
    
    onMount( async() => {
        config = new configuration()
        salles = await getSalles()
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

    function uri(salle) {
        return "salle#" + salle.batiment.replaceAll(" ","_")+ "_" +salle.salle.replaceAll(" ","_")
    }

</script>

<GridCard title="Salles Ouvertes" id="salles" params_callback={dialog_call}>
    {#if Object.values(data).length == 0}
        Ajoutes des salles à visualiser 😉
    {/if}
    { #each Object.values(data) as salle }
    {#if salle.error}
        <SubCard title={salle.batiment + " " + salle.salle} color="red">
            <p>
                { salle.error }
            </p>
            <a href={uri(salle)}>
                Accéder au planning ↗
            </a>
        </SubCard>
    {:else if salle.state == "Occupé"}
        <SubCard title={salle.batiment + " " + salle.salle} color="red">
            <p>
                { salle.state } jusqu'au <br> {stringify_date(salle.until)} 
            </p>
            <a href={uri(salle)}>
                Accéder au planning ↗
            </a>
        </SubCard>
    {:else}
        <SubCard title={salle.batiment + " " + salle.salle} color="green"> 
            <p>
                { salle.state } jusqu'au <br> {stringify_date(salle.until)} 
            </p>
            <a href={uri(salle)}>
                Accéder au planning ↗
            </a>
        </SubCard>
    {/if}


    { /each }
</GridCard>

<style>

    a[href] {
        all:unset;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        color:var(--text);
    }

</style>