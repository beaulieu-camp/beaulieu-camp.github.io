<script lang="ts">
    import { onMount } from "svelte";

    let code = "base"
    let temperature = ""

    onMount(async()=>{
        const response = await fetch('https://beaulieu-camp.github.io/meteo/index.json')
        let data = await response.json()
        temperature = data.temperature
        code = data.code
    })

</script>

<span>
    <img draggable="false" src="/weather/{code}.svg" alt="icon"/>
    <div>
        <h1> {temperature}° </h1>
    </div>
</span>

<style>
    span {
        display: flex;
        align-items: center;
        height: 64px;
        position: absolute;
        z-index: 1;
        padding:4px;
        border-radius: 16px;
        left:8px;
        top:64px;

        box-shadow: 0 4px 30px #0000001a;
        border: 1px solid rgba(0,0,0,.3);
        backdrop-filter: blur(6.7px);
        -webkit-backdrop-filter: blur(6.7px);
        user-select: none;
    }

    div {
        flex:1;
        display: flex;
        flex-direction: column;
        letter-spacing: 0.3rem;
        text-align: right;
    }

    h1 {
        font-size: 2rem;
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