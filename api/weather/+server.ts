import pb from "../pocketbaseClient";
import {json} from "@sveltejs/kit"

// const login = import.meta.env.VITE_WEATHER_KEY
// const passwd = import.meta.env.VITE_WEATHER_KEY
// async function update(temperature,code) {
//     const { error } = await supabase.from('weather').update({ temperature: temperature, code: code }).eq('when', 'now')
// }
// 
// let lat = "48.1160682"
// let lon = "-1.6401422"
// 
// let temperature = meteo["temperature"]
// let code = meteo["code"]

// if ( Date.now() - (new Date(meteo["last_update"])).getTime()  >= 60*60*1000 ) {
//     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
//     let resp = await fetch(url);
//     let json_data = await resp.json();

//     temperature = Math.round(json_data["main"]["temp"])
//     code = json_data["weather"][0]["icon"]

//     update(temperature,code)
// }

export async function GET() {
    const meteo = await pb.collection('weather').getOne('5drr8gwcts5xekn')
    return json(meteo);
};
