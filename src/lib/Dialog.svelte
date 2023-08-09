<script lang="ts">
    import { onMount } from "svelte";
    import { dialog } from "../includes/dialog";
    import type {values} from "../includes/dialog";
  import search from "../includes/search";
  import Icons from "./Icons.svelte";

    let container:dialog
    let el:HTMLDialogElement
    let values:values = []
    let filter = ""

    onMount(()=>{
        container = new dialog(el)
        
        container.values.subscribe((value) => {
            values = value
        })
                        
    })

    function checked(e,value) {
        value.checked = e.target.checked
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
        <button on:click={ () => container.close() }>Save</button>
    </div>
</dialog>


<style>
    dialog {
        height: 70vh ;
        width:clamp(0px,100%,370px);
        border-radius: 16px;
        background:var(--secondary);
        color:var(--text);
        padding:16px;
        border: 2px solid var(--primary);
        box-shadow: var(--shadow);
    }
    .form {
        display: flex;
        flex-direction: column;
        gap:16px;
        height: 100%;
    }
    .container {
        height: 100%;
        overflow: auto;
    }

    dialog::backdrop {
        background-color: rgba(0, 0, 0, .5);
    }


</style>