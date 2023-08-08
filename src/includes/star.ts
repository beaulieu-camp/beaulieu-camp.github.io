let url = "https://data.explore.star.fr/api/records/1.0/search/"
url += "?dataset=tco-bus-circulation-passages-tr&timezone=Europe/Paris&rows=200&q=&refine.precision=Temps réel"
url += "&geofilter.polygon=(48.1115718311405,-1.647477149963379),(48.11274662400898,-1.634538173675537),(48.12247345006807,-1.6274142265319822),(48.12851776605501,-1.6274571418762207),(48.119221829479585,-1.650395393371582),(48.1115718311405,-1.647477149963379)"

let url2 = "https://beaulieu-camp.github.io/star/index.json"

export type star_ret = {
    [idarret:string] : {
        nom : string,
        dessertes: {
            [idligne : string] : {
                nom:string,
                sens : {
                    [sens:string] : {
                        direction:string,
                        horaires : number[],
                        prochainshoraires : number[]
                    }
                }
            }
        }
    }
}

type star_in = {
    records : {
            fields : {
                idarret: number,
                idligne: string,
                nomarret: string,
                nomligne: string,
                coordonnees: number[],
                nomcourtligne: string,
                depart: string,
                destination: string,
                sens: string,
            }
        }[]
}

export async function star_fetch(){
    let req1 = await fetch(url2)
    if (req1.status != 200) {
        throw ("Api Star Pété") 
    }

    let req2 = await fetch(url)
    if (req2.status != 200) {
        throw ("Api Star Pété") 
    }

    let obj_ret:star_ret = await req1.json()
    let data:star_in = await req2.json()

    for (let item of data["records"]){
        let idarret = item.fields.idarret
        let idligne = item.fields.idligne
        let nomarret = item.fields.nomarret
        let nomligne = item.fields.nomcourtligne
        let sens = item.fields.sens
        let horaire = (new Date(item.fields.depart)).getTime()/1000
        let direction = item.fields.destination

        if ( !obj_ret[idarret] ) obj_ret[idarret] = {nom:nomarret,dessertes:{}}
        if ( !obj_ret[idarret].dessertes[idligne] ) obj_ret[idarret].dessertes[idligne] = {nom:nomligne,sens:{}}
        if ( !obj_ret[idarret].dessertes[idligne].sens[sens] ) obj_ret[idarret].dessertes[idligne].sens[sens] = {direction:direction,horaires:[],prochainshoraires:[]}
        if ( !obj_ret[idarret].dessertes[idligne].sens[sens].prochainshoraires ) obj_ret[idarret].dessertes[idligne].sens[sens].prochainshoraires = []

        obj_ret[idarret].dessertes[idligne].sens[sens].prochainshoraires.push(horaire)
    }
    return Object.values(obj_ret).sort((a,b) => { return a.nom.localeCompare(b.nom) })
}