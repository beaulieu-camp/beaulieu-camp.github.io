type AgendaEvent = {
	"annee"?:String,
	"description"?:String,
	"date"?:Date,
	"specialites" ?: String[]
}

let reqUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSf-0XQZqrIxWYYhkoRRDpwb671i2gKv7Om43v4l6blLKmkLZjAx_tqzm2_w4mcNtYg0us5RvZKlhqG/pub?output=tsv"

export async function getData() {
	let req = await fetch(reqUrl)
	let resp = await req.text()

	let lines = resp.split("\n").slice(1)

	let objList = []
	for ( let line of lines ) {
		let obj:AgendaEvent = {}
		let maLigne = line.split("	")

		if ( maLigne[1] === "" && maLigne[4] === "" ) continue

		obj["annee"]       = maLigne[1]
		obj["description"] = maLigne[4]

		let date = maLigne[5].replaceAll("\r","").split("/")


		obj["date"] = Date.parse(`${date[2]}-${date[1]}-${date[0]}`)

		if ( obj["annee"] === "ESIR 1" ) {
			obj["specialites"] = maLigne[2].split(",")
		}
		else if ( obj["annee"] === "ESIR 2" || obj["annee"] == "ESIR 3" ) {
			obj["specialites"] = maLigne[3].split(",")
		}

		objList.push(obj)

	}

	objList.sort((a,b) => {return a.date-b.date})

	return objList
}