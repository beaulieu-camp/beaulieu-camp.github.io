let url = "https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-vehicules-position-tr&q=&rows=1000"

export async function bus_fetch(){
    let req1 = await fetch(url)
    if (req1.status != 200) {
        throw ("Api Star Pété") 
    }

    let data = await req1.json()
    let liste_ret = []
    for (let item of data["records"]){
        if (item.fields.etat == "Hors-service") continue

        liste_ret.push(item.fields)
    }

    return liste_ret
}