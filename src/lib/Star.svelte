<script lang="ts">
    import { onMount } from "svelte";
    import Card from "./Card.svelte";
    import SubCard from "./SubCard.svelte";
    import {star_fetch} from "../includes/star"
    import type {star_ret} from "../includes/star"

    let data:star_ret = {}

    onMount(async() => {
        data = await star_fetch()
    })

    function date_parse(timestamp:number) {
        let date = new Date(timestamp*1000)
        return `${date.getHours()}:${date.getMinutes()}`
    }

    function event_filter(horairetheo:number[], horaireprat:number[]|undefined) : {time:number,type:string}[] {
        let now = (new Date()).getTime()/1000
        let filtered = horairetheo

        let obj_ret = []

        for ( let item of filtered ) {
            if (item >= now) {
                obj_ret.push({time:item,type:"Théorique"})
            }
        }

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
</script>

<Card title="Réseau Star" taille="square">

    {#each Object.values(data) as ligne}
        {#each Object.values(ligne.sens) as sens}
            {#each Object.values(sens.dessertes) as arret }
                <SubCard title={"Ligne " + ligne.nom + " Arrêt " + arret.nom + " Direction " + sens.direction} color="">
                    <table>
                        {#each event_filter(arret.horaires,arret.prochainshoraires ) as horaire }
                            <tr>{horaire.type} : {date_parse(horaire.time)}</tr>
                        {/each}
                         <!-- {#if arret.prochainshoraires }
                            {#each arret.prochainshoraires as horaire }
                                <tr>Pratique {date_parse(horaire)}</tr>
                            {/each}
                        {/if} -->
                    </table>
                </SubCard>
            {/each}
        {/each}
    {/each}

</Card>