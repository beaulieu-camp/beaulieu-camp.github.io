<script>
    import Card from "./Card.svelte"
    import { onMount } from "svelte";
    import "leaflet/dist/leaflet.css"
    import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
    import "leaflet-search/dist/leaflet-search.min.css"
    
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
        const L = await import("leaflet")
        await import("leaflet-fullscreen")
        await import("leaflet-search")

        const geojson = await import('./geojson.json')

        var map = L.map("mymap", {
            center: [48.119,-1.638],
            zoom: 15,
            fullscreenControl: true,
        });

        let searchLayer = L.geoJSON(geojson).setStyle({ 
            weight: 0,
            opacity: 1,
            color: '#aa55ff',
            dashArray: '3',
            fillOpacity: 1
        }).addTo(map);

        L.control.search({
            layer: searchLayer,
            initial: false,
            propertyName: 'name',
            buildTip: function(text, val) {
                return '<a href="#">'+text+'</a>';
            }
        }).addTo(map)


        let query = window.matchMedia('(prefers-color-scheme: dark)')

        changelayer(query,map)
        query.addEventListener('change', (e) => changelayer(e,map));




        const resto = L.divIcon({
            html: `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><path d="M692 244C676 244 564 276 564 420V532C564 567.3 592.7 596 628 596H660V724C660 741.7 674.3 756 692 756C709.7 756 724 741.7 724 724V596V484V276C724 258.3 709.7 244 692 244ZM340 260C340 251.8 333.9 245 325.7 244.1C317.5 243.2 310.2 248.6 308.4 256.5L278.1 392.8C276.7 399.1 276 405.5 276 411.9C276 457.8 311.1 495.5 356 499.6V724C356 741.7 370.3 756 388 756C405.7 756 420 741.7 420 724V499.6C464.9 495.5 500 457.8 500 411.9C500 405.5 499.3 399.1 497.9 392.8L467.6 256.5C465.8 248.5 458.3 243.2 450.2 244.1C442.1 245 436 251.8 436 260V394.2C436 399.6 431.6 404 426.2 404C421.1 404 416.9 400.1 416.4 395L403.9 258.6C403.2 250.3 396.3 244 388 244C379.7 244 372.8 250.3 372.1 258.6L359.7 395C359.2 400.1 355 404 349.9 404C344.5 404 340.1 399.6 340.1 394.2V260H340ZM388.3 412H388H387.7L388 411.3L388.3 412Z" fill="black"/></svg>`,
            className: "mapicon",
            iconSize: [30, 30],
            iconAnchor: [15, 15],
        });

        const biblio = L.divIcon({
            html: `<svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="500" cy="500" r="500" fill="white"/><g clip-path="url(#clip0_1920_6)"><path d="M372 244C319 244 276 287 276 340V660C276 713 319 756 372 756H660H692C709.7 756 724 741.7 724 724C724 706.3 709.7 692 692 692V628C709.7 628 724 613.7 724 596V276C724 258.3 709.7 244 692 244H660H372ZM372 628H628V692H372C354.3 692 340 677.7 340 660C340 642.3 354.3 628 372 628ZM404 388C404 379.2 411.2 372 420 372H612C620.8 372 628 379.2 628 388C628 396.8 620.8 404 612 404H420C411.2 404 404 396.8 404 388ZM420 436H612C620.8 436 628 443.2 628 452C628 460.8 620.8 468 612 468H420C411.2 468 404 460.8 404 452C404 443.2 411.2 436 420 436Z" fill="black"/></g><defs><clipPath id="clip0_1920_6"><rect width="448" height="512" fill="white" transform="translate(276 244)"/></clipPath></defs></svg>`,
            className: "mapicon",
            iconSize: [30, 30],
            iconAnchor: [15, 15],
        });

        // L.marker([48.122803,-1.640106], {icon:resto}).addTo(map); // etoile
        L.marker([48.122703,-1.640056], {icon:resto}).addTo(map); // etoile

        L.marker([48.123273013829646, -1.6306942287729789], {icon:resto}).addTo(map); // iut
        
        L.marker([48.122112160209,-1.6375839817504], {icon:resto}).addTo(map); // insa

        // L.marker([48.1184286,-1.6359016], {icon:resto}).addTo(map); // astrolab
        L.marker([48.1185083,-1.6358256], {icon:resto}).addTo(map); // astrolab

        L.marker([48.11898960917824, -1.6363456435142263], {icon:biblio}).addTo(map); // biblio


        var circle = L.circle([42.7, 2.7], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);

        navigator.geolocation.watchPosition((e) => {
            console.log(e.coords,e,circle)
            circle.setLatLng([e.coords.latitude,e.coords.longitude])
        })

        	// control that shows state info on hover
        // const info = L.control();

        // info.onAdd = function (map) {
        //     this._div = L.DomUtil.create('div', 'info');
        //     this._div.innerHTML = `<input>`;
        //     this.update();
        //     return this._div;
        // };

        // info.update = function (props) {
        // };

        // info.addTo(map);
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