<script lang="ts">
    import Icons from "$lib/Icons.svelte"
</script>

<footer>
	<a class="iconbtn" href="/"><Icons width="32" name="home"/></a>
	<a class="iconbtn" href="/map"><Icons width="32" name="map"/></a>
	<a class="iconbtn" href="/settings"><Icons width="32" name="settings"/></a>
</footer>

<style>
	
	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		background-color: var(--primary);
		box-shadow: var(--shadow);
		left:8px;
		bottom: 8px;
		z-index: 50;
		border-radius: 16px;
		overflow: hidden;
	}
  
  a {
    flex:1;
   text-align:center;
    
  }
  
  @media (max-width:450px){
    footer{
    	width:calc(100% - 16px);
    }
  }
  
</style>