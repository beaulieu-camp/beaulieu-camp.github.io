<script lang="ts">
  import SubCard from "./SubCard.svelte";

    export let value = ""
    let url = "https://discord.com/api/webhooks/1139252281620041869/gxywncJzWyvsWDfIbdgFUx-zquJjL0JBOBO7vs7Joud073z3wafHis0L-tUX2IRATz2T"

    async function send(){
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({content:value,thread_name:"Feedback"}),
        })
    }

</script>


<SubCard title="Feedback">
    <textarea bind:value={value}></textarea>
    <button on:click={send}>Envoyer</button>
</SubCard>

<style>
    textarea{
        width: 100%;
        height: 150px;
        resize: none;
        outline: unset;
    }
</style>

