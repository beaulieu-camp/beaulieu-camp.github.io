
export default class {
    geojson
    tag
    constructor(geojson,tag) {
        this.geojson = geojson
        this.tag = tag

        const info = L.control();

        let search_this = this

        info.onAdd = function(map) {
            this._div = L.DomUtil.create('div', 'search leaflet-control');
            this._div.addEventListener("mousedown", L.DomEvent.stopPropagation);
            this._div.innerHTML = `<input><div></div>`;
            let div = this._div.children[1]
            this._div.children[0].addEventListener("input",(e) => search_this.search(e,search_this,div,map))
            return this._div;
        };

        return info
    }

    search(e,ctx,div,map) {
        div.innerHTML = ""
        if (! e.target.value) return


        let filtered = Object.values(ctx.geojson._layers).filter(
            (layer) => layer.feature.properties["name"].toUpperCase().includes(e.target.value.toUpperCase()) 
        )


        for ( let layer of filtered.splice(0,10)){
            let a = document.createElement("a")
            a.style.display="block"

            a.addEventListener("pointerdown",(e) => { map.fitBounds(layer.getBounds()) } ) ;
            a.href="#"
            a.innerText = layer.feature.properties["name"]
            div.appendChild(a)
        }

    }
}
