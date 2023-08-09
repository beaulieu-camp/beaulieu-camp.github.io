<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import SubCard from "./SubCard.svelte";
    import {star_fetch,get_arrets} from "../includes/star"
    import type {arret_obj} from "../includes/star"
    import {dialog,created} from "../includes/dialog"
    import {configuration} from "../includes/store"

    let data:{[key:string]:arret_obj} = {} 
    let actualtime = Math.floor((new Date()).getTime()/1000)
    let config:configuration


    async function update_arrets(){
        data  = {}
        for (let key of config.get("arrets")){
            data[key] = await star_fetch( key )
        }
    }

    onMount(async() => {
        config = new configuration()
        await update_arrets()
    })

    function time_beautify(time:number){
        let hours = Math.floor(time/60/60)
        let minutes = Math.floor(time/60)-hours*60

        if (minutes == 0) return "Imminent"
        else if (hours == 0) return `Dans ${minutes} minutes`
        else return `Dans ${hours} heures et ${minutes} minutes` 
    }

    function date_parse(timestamp:number) {
        let date = new Date(timestamp*1000)
        return date.toTimeString().split(" ")[0] 
    }

    function event_filter(horairetheo:number[], horaireprat:number[]|undefined) : {time:number,type:string}[] {
        let now = (new Date()).getTime()/1000
        let filtered = horairetheo

        let obj_ret = []

        for ( let item of filtered ) {
            if (item >= now ) {
                obj_ret.push({time:item,type:"Théorique"})
            }
        }

        // console.log(horairetheo)

        obj_ret = obj_ret.slice(0,2)

        if (horaireprat){
            for ( let item of horaireprat ) {
                if (item >= now) {
                    obj_ret.push({time:item,type:"Pratique"})
                }
            }
        }

        return obj_ret.sort( (a,b) => {return a.time - b.time} )
    }

    async function dialog_call(){
        let allsalles:{id:string,name:string,checked:boolean}[] = []
        let arr = await get_arrets()
        for (let code in arr ){
            allsalles.push({
                name:arr[code],
                id:code,
                checked : config.get("arrets").includes(code)
            })
        }

        let callback =  async (liste:string[]) => {
                            config.set("arrets",liste);
                            await update_arrets();
                        }

        created.subscribe((value) => {
            value.open(allsalles,callback)
        })

    }
</script>

<Card title="Réseau Star" taille="square" params_callback={dialog_call }>
    {#each Object.values(data) as arret}
        <header>Arrêt {arret.nom}</header>
        {#each Object.values(arret.dessertes) as ligne}
            <SubCard title={"Ligne " + ligne.nom} color="">
                <table>
                    {#each Object.values(ligne.sens) as sens}
                        <th>Direction {sens.direction}</th>
                        {#each event_filter(sens.horaires,sens.prochainshoraires ) as horaire }
                            <tr>{time_beautify(horaire.time-actualtime)} ({horaire.type})</tr>
                        {/each}
                    {/each}
                </table>
            </SubCard>
        {/each}
    {/each}

</Card>