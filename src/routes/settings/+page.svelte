<script lang="ts">

    import Card from "$lib/Card.svelte";
    import Form from "$lib/Form.svelte";
    import Icons from "$lib/Icons.svelte";

</script>

<div class="container">


    <Form></Form>

    <Card title="Liste des librairies utilisées">
        <ul>
            <li>sveltekit</li>
            <li>mapbox</li>
            <li>hammerjs</li>
            <li>openstreetmap</li>
            <li>cartocdn</li>
        </ul>
    </Card>

    <Card title="Liste des librairies d'icones utilisées">
    <ul>
        <li>css.gg</li>
        <li>fontawesome</li>
        <li>simple-icons</li>
    </ul>
    </Card>

    <Card title="Listes des développeurs">
        <ul>
            <li>AquaBx</li>
        </ul>
    </Card>

    <Card title="Mentions légales">
        Aucune récupération de données.
        
        Non affilié avec l'Université de Rennes.
    </Card>

</div>

<!-- <GridCard title="Informations">

    <SubCard title="Réseaux">
       <a class="iconbtn" target="_blank" href="https://discord.gg/xbTnysGgZN"><Icons width="32" name="discord"/></a>
        <a class="iconbtn" target="_blank" href=""><Icons width="32" name="github"/></a>
    </SubCard>


</GridCard> -->

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 16px;
        gap: 16px;
    }
    .iconbtn {
        background-color: var(--primary);
        border-radius: 16px;
    }
    .iconbtn:hover {
        background-color: var(--accent-hover);
    }
</style>