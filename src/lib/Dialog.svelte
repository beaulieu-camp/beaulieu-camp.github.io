<script lang="ts">
    import { onMount } from "svelte";
    import { dialog } from "../includes/dialog";
    import type {values} from "../includes/dialog";

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
    <form>
        <input bind:value={filter}>
        <div>
            {#each values as value}
                {#if value.name.includes(filter)}
                    <label for={value.id}>{value.name}</label><input on:change={(e) => checked(e,value)} id={value.id} name={value.id} checked={value.checked} type="checkbox"><br>
                {/if}
            {/each}
        </div>
        <button on:click={ () => container.close() }>Save</button>
    </form>
</dialog>


<style>
    dialog {
        position: fixed;
        top:10%;
        height: 70vh ;
        width:clamp(0px,100%,300px)
        /* transform: translateY(-50%); */
    }
    form {
        display: flex;
        flex-direction: column;
        gap:16px;
        height: 100%;
    }
    div {
        height: 100%;
        overflow: auto;
    }
</style>