<script>
    import Card from "./Card.svelte"
    import "leaflet/dist/leaflet.css"
    import { onMount } from "svelte";
    
    
    function changelayer(event,map){
        let style
        if (event.matches){
            style = "dark_nolabels"
        }
        else {
            style = "light_nolabels"
        }

        let layer = `https://{s}.basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}{r}.png`
        L.tileLayer(layer,{}).addTo(map);
        
    }


    onMount(async() => {
        const L = await import('leaflet');
        const geojson = await import('./geojson.json')

        var map = L.map("mymap", {
            center: [48.119,-1.638],
            zoom: 15,
        });

        let query = window.matchMedia('(prefers-color-scheme: dark)')

        changelayer(query,map)
        query.addEventListener('change', (e) => changelayer(e,map));
        
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        L.geoJSON(geojson).setStyle({ 
            weight: 1,
            opacity: 1,
            color: '#aa55ff',
            dashArray: '3',
            fillOpacity: 0.7
        }).addTo(map);
        
    })

</script>
  
    <Card title="Carte Beaulieu">
        <div class="box">
            <div id="mymap"></div>
            <span>
                © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
            </span>
        </div>
    </Card>

<style>

#mymap {
    height: 30em;
    width: 100%;
    border-radius: 2em;
    background-color: var(--background);
}

.box {
    display: flex;
    flex-direction: column;
    gap:0.5em;
    width: 100%;
    text-align: center;
}
    
</style>