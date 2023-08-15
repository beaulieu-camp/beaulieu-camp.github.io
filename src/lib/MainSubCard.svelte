<script lang="ts">

export let title : string
export let color : string

</script>

<div class="subcard">
    {#if title}
        <header>{title}</header>
    {/if}
    <span class={color}><slot></slot></span>
</div>

<style>

    .subcard {
        background-color: var(--primary);
        padding: 16px ;
        border-radius: 16px;
        width: calc( 100% - 32px );
        max-width: 300px;
    }
    
    header {
        font-size: 1.2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .red {
        color: var(--red)
    }

    .yellow {
        color: var(--yellow)
    }

    .green {
        color: var(--green)
    }

</style>