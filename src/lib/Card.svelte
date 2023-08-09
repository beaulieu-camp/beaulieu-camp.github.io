<script lang="ts">

    export let title:String
    export let taille:String
    export let params_callback: Function|undefined

    import Icons from "$lib/Icons.svelte"

</script>



<div class="card {taille}">
    {#if params_callback != undefined} 
    <!-- params_callback -->
        <button on:click={ params_callback() }><Icons name="settings"></Icons></button>
        
    {/if}
    <header>{title}</header>
    <div class="flex">
        <slot></slot>
    </div>
</div>



<style>
    button {
        all:unset;
        position: absolute;
        top:18px;
        right: 18px;
    }

    .card > header {
        text-align: center;
        padding-bottom:8px;
        font-size: 1.5rem;
    }

    .card {
        position: relative;
        user-select: none;
        break-inside: avoid;
        
        background: var(--secondary);
        backdrop-filter: opacity(0.5);

        /* backdrop-filter: blur(4); */
        padding: 16px;
        border-radius: 24px;
        box-shadow: var(--shadow);
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
        aspect-ratio: 2/3;
    }
    .demi{
        aspect-ratio: 2/1;
    }
</style>