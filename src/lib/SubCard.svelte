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
        backdrop-filter: blur(4);
        padding: 1rem ;
        border-radius: 1rem;
        width: calc( 100% - 2rem );
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