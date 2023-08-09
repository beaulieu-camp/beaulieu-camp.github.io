<script lang="ts">
    import { onMount } from "svelte";
    import { dialog } from "../includes/dialog";
    import type {values} from "../includes/dialog";

    let container:dialog
    let el:HTMLDialogElement
    let values:values = []

    onMount(()=>{
        container = new dialog(el)
        
        container.values.subscribe((value) => {
            values = value
        })
                        
    })

</script>

<dialog bind:this={el}>
    <form>
        {#each values as value}
            <label for={value.id}>{value.name}</label><input id={value.id} name={value.id} checked={value.checked} type="checkbox">
            <br>
        {/each}
    </form>
    <button on:click={ () => container.close() }>Save</button>
</dialog>


<style>
    dialog {
        position: fixed;
        top:10%;
        max-height: 70vh ;
        /* transform: translateY(-50%); */
    }
</style>