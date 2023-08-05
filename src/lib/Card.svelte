<script lang="ts">

    export let title:String
    export let taille:String

</script>



<div class="card {taille}">
    <header>{title}</header>
    <div class="flex">
        <slot></slot>
    </div>
</div>



<style>

    .card > header {
        text-align: center;
        padding-bottom:8px;
        font-size: 1.5rem;
    }

    .card {
        user-select: none;
        break-inside: avoid;
        background-color: var(--secondary);
        backdrop-filter: blur(4);
        padding: 16px;
        border-radius: 24px;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
        margin: 0 auto 16px auto;
        transition: height 0.25s ease-in;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-width: 350px;
    }

    div.flex {
        overflow: overlay;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        gap : 16px;
        border-radius: 16px;
    }

    .meteo > div.flex{
        overflow:unset;
    }
    .square{
        aspect-ratio: 1/1;
    }
    .large{
        aspect-ratio: 1/2;
    }
    .demi{
        aspect-ratio: 2/1;
    }
</style>