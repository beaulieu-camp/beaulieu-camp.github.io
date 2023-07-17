import {json} from "@sveltejs/kit"

import * as cheerio from 'cheerio';

async function load() {
    const data = await fetch("https://www.crous-rennes.fr/se-restaurer/ou-manger/");
    const text = await data.text()
    return cheerio.load(text)
}

export async function GET() {
    const state = await load()

    let liste = []

    state("span[class=restaurant_opening_state]").each(function() {
        let nom = state(this).parent().find(".restaurant_title").text()
        let ouverture = state(this).attr("data-opening").split(",")

        if ( nom.toLowerCase().includes("astrolabe") || nom.toLowerCase().includes("insa") || nom.toLowerCase().includes("etoile") ){
            liste.push({
                nom:nom,
                ouverture:ouverture
            })
        }
    })

    return json(
        liste
    );
};
