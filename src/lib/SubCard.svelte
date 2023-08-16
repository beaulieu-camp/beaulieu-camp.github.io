<script lang="ts">

export let title : string
export let color : string

</script>

<div class="subcard">
    <header>{title}</header>
    <span class={color}><slot></slot></span>
</div>

<style>

    .subcard {
        background-color: var(--secondary);
        padding: 16px ;
        border-radius: 16px;
        box-shadow: var(--shadow);
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