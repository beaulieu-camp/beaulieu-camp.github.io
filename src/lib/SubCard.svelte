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
        padding: 16px ;
        border-radius: 16px;
        width: calc( 100% - 32px );
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