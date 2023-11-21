<script lang="ts">
    import { onMount } from "svelte";
    import GridCard from "$lib/GridCard.svelte";
    import SubCard from "$lib/SubCard.svelte";
    import { salleLibres,getSalles } from "salles_module";

    class Salle {
        name:string
        id:string

        constructor(id:string,name:string){
            this.name = name
            this.id = id
        }

        async getHoraire(date:number){
            return await salleLibres(this.id,date)
        }
    }

    class Batiment {
        salles:{[key:string]:Salle}
        name : string

        constructor(name:string){
            this.salles = {}
            this.name = name
        }

        set addSalle(list:[string,string]){
            let key =  list[0]
            let name =  list[1]
            this.salles[key] = new Salle(key,name)
        }

        get getSalles(){
            return Object.values(this.salles)
        }

    }

    let horaires:{[key:string]:Batiment} = {}        

    function stringify_date(time:number){
        if (time == undefined) return 'updating';

        let date = new Date(time*1000)
        
        return date.toLocaleString('fr')
    }
    
    onMount( async() => {
        let keys = await getSalles()

        for (let key in keys){
            let bat = keys[key].batiment
            let sal = keys[key].salle

            if (! ( bat in horaires) ){
                horaires[bat] = new Batiment(bat)
            }

            horaires[bat].addSalle = [key,sal]
        }

    })

    function uri(batiment:string,salle:string) {
        return "salle#" + batiment.replaceAll(" ","_")+ "_" +salle.replaceAll(" ","_")
    }

</script>

{ #each Object.values(horaires) as batiment }

    <GridCard title="Salles du {batiment.name}" id="salles">
        {#each batiment.getSalles as salle}
            <SubCard title={salle.name} color="red">
                
                    {#await salle.getHoraire(Date.now()/1000) }
                        <p>Loading</p>
                    {:then response}                   
                        {#if response.error}
                            <p>{ response.error }</p>
                        {:else}
                            <p>{ response.state } jusqu'au <br> { stringify_date(response.until) }</p>
                        {/if}

                    {/await}
                    
               
                <a href={uri(batiment.name,salle.name)}>
                    Accéder au planning ↗
                </a>
            </SubCard>
        {/each}
    </GridCard>
{ /each }

<style>

    a[href] {
        all:unset;
        cursor: pointer;
        user-select: none;
        -webkit-user-drag: none;
        color:var(--text);
    }

</style>