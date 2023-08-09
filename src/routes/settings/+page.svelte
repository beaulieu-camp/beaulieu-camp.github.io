<script lang="ts">
    import Card from "$lib/Card.svelte";
    import { onMount } from "svelte";
    import { configuration } from "../../includes/store";

    let value 

    let importnode:HTMLElement
    let exportnode:HTMLElement

    let file: File
    let reader:FileReader;
    let config:configuration
    
    function importfile(){
        importnode.click();
    }

    function exportfile(){
        let data = config.all()
        let json = JSON.stringify(data)
        let blob = new Blob([json], {type: "octet/stream"})
        let url = window.URL.createObjectURL(blob)
        exportnode.href = url;
        exportnode.click();
        window.URL.revokeObjectURL(url);
    }

    onMount(() =>{
        config = new configuration()

        // config reader
        reader = new FileReader()
        reader.onload = (e) => {
            config.import(JSON.parse(e.target.result));
        };

        // config import node
        importnode = document.createElement('input');
        importnode.type = 'file';
        importnode.accept = '.json';
        importnode.onchange = (e) => { 
            var file = e.target.files[0];
            reader.readAsText(file);
        }

        // config export node
        exportnode = document.createElement('a');
        exportnode.download = "config.json";
    })

</script>

<Card title="Paramètres" taille="square">

<div>
    <p>Les données concernants les widgets sont stockés dans votre navigateur.</p>
    <p>Ce qui veut dire que si vos données navigateur sont effacés, vous devrez tout reconfigurer ☹️.</p>
    <p>Pour ne pas avoir de surprises ou avoir ses données sur un autre appareil, exporter votre configuration 😉.</p>
</div>
<div>
    <button on:click={importfile}>Importer</button>
    <button on:click={exportfile}>Exporter</button>
</div>
    
</Card>
