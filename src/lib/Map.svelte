<script>
    import Card from "./Card.svelte"
    import "leaflet/dist/leaflet.css"
    import { onMount } from "svelte";
    
    
    onMount(async() => {
        const L = await import('leaflet');
        const geojson = await import('./geojson.json')

        var map = L.map("mymap", {
            center: [48.1160682,-1.6401422],
            zoom: 14
        });
        let attrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

        let layer1 = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        let layer2 = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        L.tileLayer(layer2,{attribution: attrib, subdomains: 'abcd'}).addTo(map);
        L.geoJSON(geojson).addTo(map);
    })

</script>
  
    <Card title="Carte Beaulieu">
        <div id="mymap"/>
    </Card>

<style>

div {
    height: 30em;
    width: 100%;
    border-radius: 2em;
}
    
</style>