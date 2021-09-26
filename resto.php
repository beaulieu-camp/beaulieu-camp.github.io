<style>

table{
    border-collapse : collapse;
    width:100%;
}

</style>

<div id="menus">
<h3>l'Astrolabe</h3>
<table id="astro"></table>
<h3>l'Etoile</h3>
<table id="etoile"></table>
</div>


<script type="module">

    async function scrap(req){
        const parser = new DOMParser();

        let res2 = await fetch("scrap.php?q=resto-u&t="+req);
        res2 = await res2.text();

        const doc2 = parser.parseFromString(res2, "text/html");

        let lis2 = doc2.querySelectorAll("#menu-repas .slides > li")

        let liste2 = []
        for (let tr of lis2) {
            let nlist = []

            var title = tr.querySelectorAll("h3")[0].innerText.split("Menu du ")[1]
            var date = new Date(title)
            var datenow = Date.now()
            if(date.getTime()+86400000 > datenow){
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

    console.log(menu_astro)
    console.log(menu_etoile)


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
            td1.style = "border: 1px dashed black; width: calc(100% / 3);"
            etoile.appendChild(td1)
        }
        if (await menu_astro[0]){
            var td2 = document.createElement(type)
            td2.innerHTML = await menu_astro[init][i]        
            td2.setAttribute("colspan",col)
            td2.style = "border: 1px dashed black; width: calc(100% / 3);"
            astro.appendChild(td2)
        }
    }

</script>