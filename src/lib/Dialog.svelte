<script lang="ts">
    import { onMount } from "svelte";
    import { dialog } from "../includes/dialog";
    import type {values} from "../includes/dialog";
    import Icons from "./Icons.svelte";

    let container:dialog
    let el:HTMLDialogElement
    let values:values = []
    let filter = ""
    let modified: boolean

    function denoise(str:string){
        let normalized = str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
        return normalized
    }

    function save(){
        if (modified){
            container.close()
        }
        else{
            el.close()
        }
    }

    function checked(e:InputEvent,value) {
        modified = true
        value.checked = e.target!.checked
    }

    onMount(()=>{
        container = new dialog(el)
        
        container.values.subscribe((value) => {
            modified = false
            filter = ""
            values = value
        })

        el.addEventListener("click",  (e) => {
            if ( e.target === el) {
                save()
            }
        })

    })

</script>

<dialog bind:this={el}>
    <div tabindex="-1" autofocus class="form">
        <div class="search">
            <div>
                <input class="searchbar" bind:value={filter}>
                <Icons width="24" name="search"></Icons>
            </div>
        </div>
        <div class="container">
            {#each values as value}
                {#if denoise(value.name).includes(denoise(filter))}
                    <input on:change={(e) => checked(e,value)} id={value.id} name={value.id} bind:checked={value.checked} type="checkbox">
                    <label for={value.id}>{value.name} </label>
                    <br>
                {/if}
            {/each}
        </div>
        <button on:click={ save }>Fermer</button>
    </div>
</dialog>


<style>
    dialog {
        height: 70vh ;
        width:clamp(0px,100%,370px);
        border-radius: 16px;
        background:var(--background);
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
        overflow: overlay;
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