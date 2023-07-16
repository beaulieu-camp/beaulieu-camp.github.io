<script>
    import { onMount } from "svelte";
    import Weather from "../lib/Weather.svelte";
    import Map from "../lib/Map.svelte";

    let temp
    let weather

    onMount(async() => {

        let lat = "48.1160682"
        let lon = "-1.6401422"
        let appid = "7fb0c303e53d50ff7e918f31385fff76"

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`;
	    let resp = await fetch(url);
	    let json_data = await resp.json();

        temp = json_data["main"]["temp"]
        weather = json_data["weather"][0]["icon"]

    });


</script>

<h1>Beaulieu'niv</h1>

<div>

    <Weather temperature={temp} weather={weather}></Weather>
    <Map></Map>

</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        gap:2em;
    }
</style>