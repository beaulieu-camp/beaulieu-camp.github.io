let menuItems = Array.from(document.querySelectorAll(".menu-items"))

let index = 0

menuItems[index].classList.add('active')
document.querySelector( menuItems[index].getAttribute("for-id") ).classList.add('active')

for(var item of menuItems){
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
		for (var item of inputs){
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


    let res = await fetch("https://aquabx.ovh/univ/scrap?q=agenda");
    res = await res.text();

    const parser = new DOMParser();
    const doc1 = parser.parseFromString(res, "text/html");

    let lis = doc1.querySelector("body > ul").children

    var liste = []

    for (let li of lis){
        let href = li.querySelector("a").href
        let date = li.querySelector(".event-date").innerText
        let img = li.querySelector(".img-fluid").src
        let tags = li.querySelector(".tags").innerText
        let metas = {}
        for (let item of li.querySelector(".event-metas").children){
            if (item.className != ''){
                metas[item.className.replace("event-","")] = item.innerText
            }
            else{
                metas["title"] = item.innerText
            }
        }
        liste.push({"href":href,"date":date,"img":img,"tags":tags,"metas":metas})
    }

    let agenda = document.querySelector("#agenda > .description")

    for (let item of liste){
        let div = document.createElement("div")
        div.setAttribute("class","card")

        let container = document.createElement("div")
        container.setAttribute("class","container")

        let reverse = document.createElement("div")
        reverse.setAttribute("class","reverse")

        let title = document.createElement("h3")
        title.style="margin: 0; color: white; text-shadow: 2px 2px 2px black;"

        let date = document.createElement("p")
        let tags = document.createElement("p")
        let metas = document.createElement("p")

        div.href = item["href"]

        title.innerText = item["metas"]["title"]

        container.style.backgroundImage = "url("+item["img"]+")"
        container.style.backgroundSize = "cover"

        date.innerText = item["date"]
        tags.innerText = item["tags"]
        //metas.innerText = item["metas"]

        container.appendChild(title)

        reverse.appendChild(date)
        reverse.appendChild(tags)
        reverse.appendChild(metas)

        div.appendChild(container)
        div.appendChild(reverse)
        agenda.appendChild(div)
    } 

    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var hh = this.getHours()
        var dd = (hh>20 ? 1 : 0) + this.getDate();        

        return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('-');
    };

    var date = new Date();

    let res2 = await fetch("https://aquabx.ovh/univ/scrap?q=biblio&date="+date.yyyymmdd());
    res2 = await res2.text();

    const doc2 = parser.parseFromString(res2, "text/html");

    let lis2 = doc2.querySelectorAll("tr")
    
    let liste2 = []

    for (let tr of lis2) {
        let nlist = []
        let th = tr.querySelectorAll("th")
        if (th.length == 0){
            th = tr.querySelectorAll("td")
        }

        for (let td of th){
            nlist.push(td.innerText)
        }
        liste2.push(nlist)
    }

    liste2[0][0] = ""

    let biblio = document.querySelector("#biblio")

    let mois = {"janv":"01","fevr":"02","mars":"03","avril":"04","mai":"05","juin":"06","juil":"07","aout":"08","sept":"09","oct":"10","nov":"11","dec":"12"}

    let tr1 = document.createElement("td")

    let par0 = liste2[0][1].split(". ")
    let par1 = liste2[0][7].split(". ")
    let m0 = mois[par0[0]]
    let m1 = mois[par1[0]]
    let j0 = par0[1].split("l")[0]
    let j1 = par1[1].split("d")[0]

    tr1.innerText = "Horaires du " + j0 + "/" + m0 +" au " + j1 + "/" + m1
    tr1.setAttribute("colspan",4)

    biblio.appendChild(tr1)

    liste2[0][1] = "lundi"
    liste2[0][2] = "mardi"
    liste2[0][3] = "mercredi"
    liste2[0][4] = "jeudi"
    liste2[0][5] = "vendredi"
    liste2[0][6] = "samedi"
    liste2[0][7] = "dimanche"


    for (let i=0;i<8;i++){
        let tr = document.createElement("tr")
        if (liste2[1][i] == liste2[2][i] && liste2[2][i] == liste2[3][i]){
            var n = 2
            var col = [0,3]
        }
        else if (liste2[2][i] == liste2[3][i]){
            var n = 2
            var col = [0,0,2]
        }
        else if (liste2[1][i] == liste2[2][i]){
            var n = 2
            var col = [0,2,0]
        }
        else {
            var n = 4
            var col = [0,0,0,0]
        }
        for (let j=0;j<n;j++){
            let td = document.createElement("td")
            td.innerText = liste2[j][i]
            td.style.width = '25%';
            td.setAttribute("colspan",col[j])
            tr.appendChild(td)
        }
        biblio.appendChild(tr)
    }
    
    async function scrap(req){
        const parser = new DOMParser();

        let res2 = await fetch("https://aquabx.ovh/univ/scrap.php?q=resto-u&t="+req);
        res2 = await res2.text();

        const doc2 = parser.parseFromString(res2, "text/html");

        let lis2 = doc2.querySelectorAll("#menu-repas .slides > li")

        let liste2 = []
        for (let tr of lis2) {
            let nlist = []

            var title = tr.querySelectorAll("h3")[0].innerText.split("Menu du ")[1]
            var date = new Date(title)
            var datenow = Date.now()
            if(date.getTime()+72900000 > datenow){
                nlist.push(title)
                let div = tr.querySelectorAll(".content > div")


                for (let content of div){
                    nlist.push(content.innerHTML)
                }
                liste2.push(nlist)
            }
        }
        return liste2
    }

    var init = 0;

    var etoile = document.querySelector("#etoile")
    var astro = document.querySelector("#astro")

    var menu_astro = await scrap("lastrolabe")
    var menu_etoile = await scrap("letoile")

    for (var i = 0; i<4; i++){
        if (i == 0){
            var col = 3
            var type = "tr"
        }
        else {
            var col = 1 
            var type = "td"
        }
        if (await menu_etoile[0]){
            var td1 = document.createElement(type)
            td1.innerHTML = await menu_etoile[init][i]
            td1.setAttribute("colspan",col)
            td1.style = "width: calc(100% / 3);"
            etoile.appendChild(td1)
        }
        if (await menu_astro[0]){
            var td2 = document.createElement(type)
            td2.innerHTML = await menu_astro[init][i]        
            td2.setAttribute("colspan",col)
            td2.style = "width: calc(100% / 3);"
            astro.appendChild(td2)
        }
    }
