<script lang="ts">

    export let title:String
    export let params_callback: Function|undefined
    export let slide: HTMLElement

    import Icons from "$lib/Icons.svelte"

    let sens = "arrowright"


    function autoflow(){
        if ( slide.style.gridAutoFlow == "unset" ) {
            slide.style.gridAutoFlow = "column" 
            sens = "arrowright"
        }
        else {
            slide.style.gridAutoFlow = "unset" 
            sens = "arrowbottom"
        }
    }
</script>



<div class="card">
    
    <header>
        {title}
        {#if slide != undefined}     
            <button class="iconbtn" on:click={ autoflow }><Icons width="20" name={sens}></Icons></button>
        {/if}
        {#if params_callback != undefined} 
            <button class="iconbtn" on:click={ params_callback() }><Icons width="20" name="settings"></Icons></button>
        {/if}

        
    </header>
    <slot></slot>
</div>



<style>



    .card > header {
        text-align: left;
        padding: 0px 32px;
        font-size: 1.5rem;
        display: flex;
        line-height: 1.25em;
        gap:8px;
        align-items: center;
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