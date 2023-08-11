<script lang="ts">

    export let title:String
    export let params_callback: Function|undefined

    import Card from "$lib/Card.svelte"

</script>



<Card title={title} params_callback={params_callback}>
    <div class="flex">
        <slot></slot>
    </div>
</Card>



<style>
    
    div.flex {
        overflow: hidden;
        display: block;
        padding: 16px;


        width: calc( 100% - 32px ) ;
        gap : 16px;
        grid-template-rows: 150px;
        grid-auto-columns: 300px;
        grid-auto-flow: column;
    }


</style>