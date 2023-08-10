<script lang="ts">
    import { onMount } from "svelte";
    import { dialog } from "../includes/dialog";
    import type {values} from "../includes/dialog";
    import Icons from "./Icons.svelte";

    let container:dialog
    let el:HTMLDialogElement
    let values:values = []
    let filter = ""

    onMount(()=>{
        container = new dialog(el)
        
        container.values.subscribe((value) => {
            filter = ""
            values = value
        })
                        
    })

    function checked(e:InputEvent,value) {
        value.checked = e.target!.checked
    }

</script>

<dialog bind:this={el}>
    <div class="form">
        <div class="search">
            <div>
                <input class="searchbar" bind:value={filter}>
                <Icons name="search"></Icons>
            </div>
        </div>
        <div class="container">
            {#each values as value}
                {#if value.name.includes(filter)}
                    <input on:change={(e) => checked(e,value)} id={value.id} name={value.id} checked={value.checked} type="checkbox">
                    <label for={value.id}>{value.name}</label>
                    <br>
                {/if}
            {/each}
        </div>
        <div class="buttons">
            <button on:click={ () => container.close() }>Save</button>
            <button on:click={ () => el.close() }>Close</button>
        </div>
    </div>
</dialog>


<style>
    dialog {
        height: 70vh ;
        width:clamp(0px,100%,370px);
        border-radius: 16px;
        background:var(--secondary);
        color:var(--text);
        border: 2px solid var(--primary);
        box-shadow: var(--shadow);
        padding:0;
    }
    .form {
        display: flex;
        flex-direction: column;
        gap:16px;
        height: calc(100% - 32px);
        padding:16px;
    }
    .container {
        height: 100%;
        overflow: auto;
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, .5);
    }

    .buttons {
        gap:16px;
        display: flex;
    }

    button{
        flex:1;
    }


</style>