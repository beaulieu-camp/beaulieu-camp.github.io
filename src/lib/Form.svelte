<script lang="ts">
  import MainSubCard from "./MainSubCard.svelte";

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
        console.log(response)
        if (response.status == 204) {
            alert("Message Envoyé, merci 🙂")
        }
        else {
            alert("Message Non Envoyé, désolé 😥")
        }
    }

</script>


<MainSubCard title="Feedback">
    <textarea bind:value={value}></textarea>
    <br>
    <button on:click={send}>Envoyer</button>
</MainSubCard>

<style>
    textarea{
        width: 100%;
        height: 150px;
        resize: none;
        outline: unset;
        border: unset;
        background-color: rgb(255,255,255,0.2);
        border-radius: 8px;
        color : var(--text);
    }
</style>

