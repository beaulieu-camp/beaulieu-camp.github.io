<script lang="ts">
    import BlockCard from "./BlockCard.svelte"
    import { onMount } from "svelte";
    import MainSubCard from "./MainSubCard.svelte";

    let desc = ""
    let code = "base"
    let temperature = ""

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/meteo/index.json')
        let data = await response.json()
        temperature = data.temperature
        code = data.code
    })

    $: switch (code) {
        case '01d' : desc= "Dégagé"   ; break;
        case '01n' : desc= "Dégagé"   ; break;
        case '02d' : desc= "Epars"    ; break;
        case '02n' : desc= "Epars"    ; break;
        case '03d' : desc= "Nuageux"  ; break;
        case '03n' : desc= "Nuageux"  ; break;
        case '04d' : desc= "Couvert"  ; break;
        case '04n' : desc= "Couvert"  ; break;
        case '09d' : desc= "Pluvieux" ; break;
        case '09n' : desc= "Pluvieux" ; break;
        case '10d' : desc= "Pluvieux" ; break;
        case '10n' : desc= "Pluvieux" ; break;
        case '11d' : desc= "Orage"    ; break;
        case '11n' : desc= "Orage"    ; break;
        case '13d' : desc= ""         ; break;
        case '13n' : desc= ""         ; break;
        case '50d' : desc= ""         ; break;
        case '50n' : desc= ""         ; break;
    }

</script>

<BlockCard title="Méteo Beaulieu">
    <MainSubCard>

        <span>
            <img draggable="false" src="/weather/{code}.svg" alt="icon"/>
            <div>
                <h1> {temperature}° </h1>
                <p> {desc} </p>
            </div>
        </span>
    </MainSubCard>

</BlockCard>



<style>
    span {
        display: flex;
        align-items: center;
        height: 100%;

    }

    div {
        flex:1;
        display: flex;
        flex-direction: column;
        letter-spacing: 0.3rem;
        text-align: right;
    }

    h1 {
        font-size: 4rem;
        margin: 0;
        font-weight: bold;
        line-height: 1em;
    }
    
    p {
        margin: 0;
        font-size: 1.5rem;
    }
    
    img {
        aspect-ratio: 1/1;
        height: 100%;
        /* font-size: 6rem; */
        /* transform: scale(2.5); */
    }

</style>