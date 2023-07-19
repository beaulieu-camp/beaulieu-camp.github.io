<script lang="ts">
    import Card from "./Card.svelte"
    import { onMount } from "svelte";

    let icon = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    let desc = ""
    let code = ""
    let temperature = ""

    onMount(async()=>{
        const response = await fetch('api/weather')
        let data = await response.json()
        temperature = data.temperature
        code = data.code
    })

    $: switch (code) {
        case '01d' : icon = '/weather/01d.svg'; desc= "Dégagé"   ;break;
        case '01n' : icon = '/weather/01n.svg'; desc= "Dégagé"   ;break;
        case '02d' : icon = '/weather/02d.svg'; desc= "Epars"    ;break;
        case '02n' : icon = '/weather/02n.svg'; desc= "Epars"    ;break;
        case '03d' : icon = '/weather/03d.svg'; desc= "Nuageux"  ;break;
        case '03n' : icon = '/weather/03n.svg'; desc= "Nuageux"  ;break;
        case '04d' : icon = '/weather/04.svg' ; desc= "Couvert"  ;break;
        case '04n' : icon = '/weather/04.svg' ; desc= "Couvert"  ;break;
        case '09d' : icon = '/weather/09.svg' ; desc= "Pluvieux" ;break;
        case '09n' : icon = '/weather/09.svg' ; desc= "Pluvieux" ;break;
        case '10d' : icon = '/weather/10d.svg'; desc= "Pluvieux" ;break;
        case '10n' : icon = '/weather/10n.svg'; desc= "Pluvieux" ;break;
        case '11d' : icon = '/weather/11.svg' ; desc= "Orage"    ;break;
        case '11n' : icon = '/weather/11.svg' ; desc= "Orage"    ;break;
        case '13d' : icon = '/weather/.svg'   ; desc= ""         ;break;
        case '13n' : icon = '/weather/.svg'   ; desc= ""         ;break;
        case '50d' : icon = '/weather/.svg'   ; desc= ""         ;break;
        case '50n' : icon = '/weather/.svg'   ; desc= ""         ;break;
    }

</script>

<Card title="Méteo Beaulieu">
    <span>
        <img draggable="false" src={icon} alt="icon"/>
        <div>
            <h1> {temperature}° </h1>
            <p> {desc} </p>
        </div>
    </span>

</Card>



<style>
    span {
        display: flex;
        align-items: center;
    }

    div {
        flex:1;
        display: flex;
        flex-direction: column;
        letter-spacing: 0.3rem;
        text-align: right;
    }

    div > h1 {
        font-size: 4rem;
        margin: 0;
        font-weight: bold;
        line-height: 4.5rem;
    }
    
    div > p {
        margin: 0;
        font-size: 1.5rem;
    }
    
    img {
        width: 10rem;
        height: 10rem;
        transform: scale(1.6);
    }

</style>