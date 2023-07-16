import { supabase } from "../supabaseClient";
import {json} from "@sveltejs/kit"

let lat = "48.1160682"
let lon = "-1.6401422"
const appid = import.meta.env.VITE_WEATHER_KEY

async function load() {
    const { data } = await supabase.from("weather").select();
    return data[0]
}

async function update(temperature,code) {
    const { error } = await supabase.from('weather').update({ temperature: temperature, code: code }).eq('when', 'now')
}

export async function GET() {
    const meteo = await load()

    let temperature = meteo["temperature"]
    let code = meteo["code"]

    if ( Date.now() - (new Date(meteo["last_update"])).getTime()  >= 60*60*1000 ) {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
        let resp = await fetch(url);
        let json_data = await resp.json();

        temperature = Math.round(json_data["main"]["temp"])
        code = json_data["weather"][0]["icon"]

        update(temperature,code)
    }

    return json({
        temperature:temperature,
        code:code
    });
};



