<script lang="ts">

    export let title:String
    export let params_callback: Function|undefined

    import Icons from "$lib/Icons.svelte"

</script>



<div class="card">
    
    <header>
        {title}
        {#if params_callback != undefined} 
            <button on:click={ params_callback() }><Icons width="20" name="settings"></Icons></button>
        {/if}
    </header>
    <slot></slot>
</div>



<style>
    button {
        all:unset;
        /* position: absolute; */
        /* top:18px; */
        /* right: 18px; */
        align-items: baseline;
        padding:0px;
        padding: 5px 10px;
        vertical-align: middle;
    }


    .card > header {
        text-align: left;
        padding: 0px 32px;
        font-size: 2rem;
        /* display: flex; */
        line-height: 1.25em;
        gap:16px;
    }

    .card {
        position: relative;
        user-select: none;

        margin: 16px 0;
        transition: height 0.25s ease-in;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        width: calc(100%);
        
    }

</style>