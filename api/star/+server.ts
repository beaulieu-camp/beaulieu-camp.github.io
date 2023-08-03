import {json} from "@sveltejs/kit"

type fields = {
    coordonnees ?: number[],
    nomcourtligne ?: string,
    depart ?: string,
    destination ?: string,
    idarret?:string
}

type star_resp = {
    records: [
        {
            fields : fields
        }
    ]
}

type resp = {
                [key: string]: {
                    nom : string,
                    dessertes: string[][]
                }
            }

export async function GET() {

    let url = "https://data.explore.star.fr/api/records/1.0/search/"
    url += "?dataset=tco-bus-circulation-passages-tr"
    url += "&geofilter.polygon=(48.1115718311405,-1.647477149963379),(48.11274662400898,-1.634538173675537),(48.12247345006807,-1.6274142265319822),(48.12851776605501,-1.6274571418762207),(48.119221829479585,-1.650395393371582),(48.1115718311405,-1.647477149963379)"

    let resp = await fetch(url)
    let data = await resp.json()

    let obj_ret:resp = {}

    for (let item of data.records ){
        let id_ar = item.fields.idarret

        if ( !obj_ret[id_ar] ) obj_ret[id_ar] = {nom:item.fields.nomarret,dessertes:[]}

        obj_ret[id_ar].dessertes.push( [
            item.fields.coordonnees,
            item.fields.nomcourtligne,
            item.fields.depart,
            item.fields.destination,


            // item.fields.sens,
            // item.fields.idligne,
        ])

    }

    return json(obj_ret);
};