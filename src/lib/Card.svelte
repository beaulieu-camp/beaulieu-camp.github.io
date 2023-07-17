<script>
    export let title
    export let link

</script>


{#if link }
    <div class="card" href={link}>
        <h3>{title}</h3>
        <div class="flex">
            <slot></slot>
        </div>
    </div>
{:else}
    <div class="card">
        <h3>{title}</h3>
        <div class="flex">
            <slot></slot>
        </div>
    </div>
{/if}



<style>
    a[href] {
        all:unset;
        cursor:pointer;
    }

    .card > h3 {
        
        margin:0 0 0.5em 0;
        text-align: center;
    }

    .card {
        overflow: hidden;
        break-inside: avoid;
        background-color: var(--secondary);
        backdrop-filter: blur(4);
        padding: 1rem ;
        border-radius: 40px;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.3);
        margin: 0 auto 1em auto;
    }

    div.flex {
        display: flex;
        align-items: center;
    }
    
</style>