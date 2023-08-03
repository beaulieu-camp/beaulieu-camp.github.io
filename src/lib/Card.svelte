<script lang="ts">

    export let title:String
    export let taille:String

</script>



<div class="card {taille}">
    <h3>{title}</h3>
    <div class="flex">
        <slot></slot>
    </div>
</div>




<style>

    .card > h3 {
        margin:0 0 0.5em 0;
        text-align: center;
    }

    .card {
        user-select: none;
        overflow: auto;
        break-inside: avoid;
        background-color: var(--secondary);
        backdrop-filter: blur(4);
        padding: 1rem ;
        border-radius: 2.5rem;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
        margin: 0 auto 1em auto;
        transition: height 0.25s ease-in;
    }

    div.flex {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: calc(100% - 3rem);
    }

    .square{
        aspect-ratio: 1/1;
    }
    .meteo{
        height: 12.5rem;
        overflow: hidden;
    }
    .semilarge{
        aspect-ratio: 2/3;
    }
    .large{
        aspect-ratio: 1/2;
    }
    .demi{
        aspect-ratio: 2/1;
    }
    .third{
        aspect-ratio: 5/2;
    }
    
</style>