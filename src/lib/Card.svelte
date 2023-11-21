<script lang="ts">

    export let title:String

    import Icons from "$lib/Icons.svelte"

</script>



<div class="card">
    
    <h3>
        {title}
    </h3>
    <p><slot></slot></p>
</div>



<style>



div{
    background-color: var(--secondary);
    padding:16px;
    border-radius: 16px ;
    display: flex;
    flex-direction: column;
}

h3,p{
    margin:0;
}

p{
    font-weight: 200;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.7;
}

</style>