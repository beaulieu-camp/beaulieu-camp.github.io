<script lang="ts">
    import GridCard from "$lib/GridCard.svelte";
    import SubCard from "$lib/SubCard.svelte";
    import { onMount } from "svelte";
    import { configuration } from "../../includes/store";
    import BlockCard from "$lib/BlockCard.svelte";
    import Form from "$lib/Form.svelte";
    import Icons from "$lib/Icons.svelte";

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

<BlockCard title="Paramètres" taille="square">
    <SubCard title="Sauvegarde">

        <div>
            <p>Les données concernants les widgets sont stockés dans votre navigateur.</p>
            <p>Ce qui veut dire que si vos données navigateur sont effacés, vous devrez tout reconfigurer ☹️.</p>
            <p>Pour ne pas avoir de surprises ou avoir ses données sur un autre appareil, exporter votre configuration 😉.</p>
        </div>
        <div>
            <button on:click={importfile}>Importer</button>
            <button on:click={exportfile}>Exporter</button>
        </div>
    

    </SubCard>
</BlockCard>


<GridCard title="Informations">
    <Form></Form>
    <SubCard title="Librairies">
        <p>sveltekit</p>
        <p>mapbox</p>
        <p>openstreetmap</p>
        <p>cartocdn</p>
    </SubCard>
    <SubCard title="Icones">
        <p>css.gg</p>
        <p>fontawesome</p>
        <p>simple icons</p>
    </SubCard>
    <SubCard title="Développeurs">
        <p>AquaBx</p>
    </SubCard>
    <SubCard title="Infos">
        <p>Non affilié avec l'Université de Rennes</p>
    </SubCard>
</GridCard>

<a target="_blank" href="https://discord.gg/xbTnysGgZN"><Icons width="32" name="discord"/></a>
<a target="_blank" href="https://github.com/beaulieu-camp"><Icons width="32" name="github"/></a>