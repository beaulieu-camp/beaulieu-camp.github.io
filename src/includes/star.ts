
export type arret_obj = {
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

type star_in = {
    records : {
            fields : {
                idarret: string,
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

export async function get_arrets(){
    let req = await fetch("https://beaulieu-camp.github.io/star/index.json")
    if (req.status != 200) {
        throw ("Api Star Pété") 
    }
    return await req.json()
}

export async function star_fetch( nomarret:string ){

    let url1 = `https://beaulieu-camp.github.io/star/${nomarret}.json`
    let url2 = `https://data.explore.star.fr/api/records/1.0/search/?dataset=tco-bus-circulation-passages-tr&refine.nomarret=${nomarret}&refine.precision=Temps%20r%C3%A9el`

    let req1 = await fetch(url1)

    if (req1.status != 200) {
        throw ("Api Star Pété") 
    }


    let req2 = await fetch(url2)
    if (req2.status != 200) {
        throw ("Api Star Pété") 
    }

    let obj_ret:arret_obj = await req1.json()
    let data:star_in = await req2.json()

    for (let item of data["records"]){

        let idligne = item.fields.idligne
        let nomligne = item.fields.nomcourtligne
        let sens = item.fields.sens
        let horaire = (new Date(item.fields.depart)).getTime()/1000
        let direction = item.fields.destination

        if ( !obj_ret.dessertes[idligne] ) obj_ret.dessertes[idligne] = {nom:nomligne,sens:{}}
        if ( !obj_ret.dessertes[idligne].sens[sens] ) obj_ret.dessertes[idligne].sens[sens] = {direction:direction,horaires:[],prochainshoraires:[]}
        if ( !obj_ret.dessertes[idligne].sens[sens].prochainshoraires ) obj_ret.dessertes[idligne].sens[sens].prochainshoraires = []

        obj_ret.dessertes[idligne].sens[sens].prochainshoraires.push(horaire)
    }

    return obj_ret
}