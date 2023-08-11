<script>
  import Weather from "$lib/Weather.svelte";
  import Map from "$lib/Map.svelte";
  import Salles from "$lib/Salles.svelte";
  import Resto from "$lib/Resto.svelte";
  import Star from "$lib/Star.svelte";
  import Biblio from "$lib/Biblio.svelte";
</script>

<Weather></Weather>
<Map></Map>

<hr id="plannings">

<Salles></Salles>
<Resto></Resto>
<Biblio></Biblio>
<Star></Star>
