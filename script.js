let menuItems = Array.from(document.querySelectorAll(".menu-items"))

let index = 0

menuItems[index].classList.add('active')
document.querySelector( menuItems[index].getAttribute("for-id") ).classList.add('active')

for(item of menuItems){
	item.onclick = function(){
		menuItems[index].classList.remove('active')
		document.querySelector( menuItems[index].getAttribute("for-id") ).classList.remove('active')

		index = menuItems.indexOf(this)

		menuItems[index].classList.add('active')
		document.querySelector( menuItems[index].getAttribute("for-id") ).classList.add('active')
	}
}

function filter(form,tableid) {
	let inputs = form.children
	let childs = document.querySelector(tableid).children;

	for (let i=0; i < childs.length; i++) {
		let status = true;
		for (item of inputs){
			let filter = item.value.toUpperCase();
			let cat = item.name
			let txtValue = childs[i].getAttribute(cat).toUpperCase();

			if (txtValue.includes(filter) && status == true) {
				childs[i].style.display = "";
			}
			else {
				childs[i].style.display = "none";
				status = false
			}
		}
	}
}


var map = L.map('map').setView([48.1192022, -1.6394826], 16);

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;
    map.getPane('labels').style.pointerEvents = 'none';


    var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
            attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
            attribution: '©OpenStreetMap, ©CartoDB',
            pane: 'labels'
    }).addTo(map);

    var polys = await fetch("polygons.json")
    polys = await polys.json()

    for (var pol of polys){
        let key = polys.indexOf(pol).toString()
        L.polygon(pol[0],{color: "orange",fillOpacity: 0.5}).addTo(map).bindTooltip(pol[1],{permanent: true, direction:"center",fill:false}).openTooltip().bindPopup(
    		pol[2] + pol[3] + "<img style='width:100%' src=" + pol[4] + ">"
        );
    }
