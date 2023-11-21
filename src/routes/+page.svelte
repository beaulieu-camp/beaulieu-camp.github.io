<script lang="ts">
  import { onMount } from "svelte";
  import { salleLibres,getSalles } from "salles_module";
  import SalleCard from "$lib/SalleCard.svelte";

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

      constructor(name:string){
          this.salles = {}
          this.name = name
      }

      set addSalle(list:[string,string]){
          let key =  list[0]
          let name =  list[1]
          this.salles[key] = new Salle(key,name)
      }

      get getSalles(){
          return Object.values(this.salles)
      }

  }

  let horaires:{[key:string]:Batiment} = {}        


  
  onMount( async() => {
      let keys = await getSalles()

      for (let key in keys){
          let bat = keys[key].batiment
          let sal = keys[key].salle

          if (! ( bat in horaires) ){
              horaires[bat] = new Batiment(bat)
          }

          horaires[bat].addSalle = [key,sal]
      }

  })



</script>

<div class="container">

  
  { #each Object.values(horaires) as batiment }
  
  <h2>Salles du {batiment.name}</h2>
  
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
  { /each }

</div>

<style>

  p {

      color : var(--color);
  }

  .flexgrid{
      display: flex;
      flex-wrap: wrap;
      gap:16px;

  }

  .flexgrid > *  {
      flex:1;
  }

  .container {
    padding:16px;
  }

</style>