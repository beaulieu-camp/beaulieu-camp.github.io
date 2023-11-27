<script lang="ts">
  import { onMount } from "svelte";
  import { salleLibres,getSalles } from "salles_module";
  import SalleCard from "$lib/SalleCard.svelte";
    import Icons from "$lib/Icons.svelte";

  class Salle {
      name:string
      id:string

      constructor(id:string,name:string){
          this.name = name
          this.id = id
      }

      async getHoraire(date:number){
          return await salleLibres(this.id,date)
      }
  }

  class Batiment {
      salles:{[key:string]:Salle}
      name : string
      show:boolean;

      constructor(name:string){
          this.salles = {}
          this.name = name
          this.show = true
      }

      alternShow() {
        this.show = !this.show
      }

      set addSalle(list:[string,string]){
          let key =  list[0]
          let name =  list[1]
          this.salles[key] = new Salle(key,name)
      }

      get getSalles(){
          return Object.values(this.salles)
      }

      get getShow(){
          return this.show
      }

  }

  let horaires:{[key:string]:Batiment} = {}        


  
  onMount( async() => {
      let salles = await getSalles()
    let keys = Object.keys(salles)
    keys.sort()
      for (let key of keys){
          let bat = salles[key].batiment
          let sal = salles[key].salle

          if (! ( bat in horaires) ){
              horaires[bat] = new Batiment(bat)
          }

          horaires[bat].addSalle = [key,sal]
      }

  })



</script>

<div class="container">
    <header>Salles Libres</header>
  
  { #each Object.values(horaires) as batiment }
  
  <div style="display:flex;align-items:center;gap:16px;">
      <h2>Salles du {batiment.name}</h2>
      <!-- <span on:click={() => batiment.alternShow()} style="display:grid;place-items:center;"><Icons name="eye" width="24"></Icons></span> -->
    </div>
    {#if batiment.getShow}
        <div class="flexgrid">
            {#each batiment.getSalles as salle}
            
            {#await salle.getHoraire(Date.now()/1000) }
                <SalleCard salle={salle.name} batiment={batiment.name}></SalleCard>
            {:then response}                   
            {#if response.error}
                <SalleCard salle={salle.name} batiment={batiment.name} error={response.error}></SalleCard>
            {:else}
                <SalleCard salle={salle.name} batiment={batiment.name} status={response.state} date={response.until}></SalleCard>
            {/if}
            {/await}
            
            {/each}
        </div>
    {/if}

  { /each }

</div>

<style>

  p {

      color : var(--color);
  }

  .flexgrid{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(300px, 1fr));
    gap: 16px;
  }
  
  .container {
    padding:16px;
  }



</style>