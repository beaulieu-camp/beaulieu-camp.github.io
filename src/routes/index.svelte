<script>
    import { onMount } from "svelte";
    import axios from "axios";

    onMount(async function () {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon";
	    let resp = await axios(url);
        console.log(resp)
    });

    export let salut = ""


    export const md = (val) => {
        return val.find(element => element > "*")
    }

</script>


<input bind:value={salut} on:keydown={md(this.value)} class="">

{salut}