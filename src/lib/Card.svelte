<script>
    import Card from "./Card.svelte"

    export let title
</script>

<div class="card">
    <h3>{title}</h3>
    <div class="flex">
        <slot></slot>
    </div>

</div>


<style>

    div.card > h3 {
        margin:0 0 0.5em 0;
        text-align: center;
    }

    div.card {
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4);
        padding: 1rem ;
        color:white;
        border-radius: 40px;
        max-width: 20rem;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
    }

    div.flex {
        display: flex;
        align-items: center;
    }
    
</style>