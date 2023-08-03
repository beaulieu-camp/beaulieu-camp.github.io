
function dichotomie(liste,datetime,a,b){
    /*

        Renvoie [x,y] 
        
        x : booléen -> si la salle est prise true, sinon false
        y : number -> date a laquelle la salle ce statut change
      
    */
    if (b-a == 1){
        var test1 = liste[a][0] < datetime
        var test2 = datetime < liste[b][1]

        if (test1 && test2){
            return [true,b]
        }
        else{
            return [false,a]
        }
         
    }
    var m = Math.floor((b+a)/2)
    if (datetime < liste[m][1]) {
        return dichotomie(liste,datetime,a,m)
    }
    else{
        return dichotomie(liste,datetime,m,b)
    }
}

async function request(url){
    const resp = await fetch(url);
    return resp.text();
};

function salleLibres(cal,date){
    /*
        Retourne si la salle est libre (true) ou non (false) sur 

        date est par défaut Date.now()

        Args : 
            - salle : string
            - date : int (UNIX time) en secondes
        Return :
            - return.state : booléen : état de la salle ( libre : true , occupé : false )
            - return.until : int : date de fin de l'état (UNIX time)
    */

    var req = dichotomie(cal, date,0,cal.length )
    var state = req[0]    
    var i = req[1]
    
    if (state){
        return {"state":"Occupé","until":cal[i][1]}
    }
    else{
        return {"state":"Libre","until":cal[i][0]}
    }
}

async function salleEvents(salle,date){
    /*
        Retourne les horaires des cours/events d'une journée donnée dans une salle donnée
        
        Args:
            - salle : string
            - date : int (UNIX time)
        return : 
            - liste des events d'une journée
    */
    var url = link[salle]
    var cal = await get_cal(url);
    var req = dichotomie(cal,date,0,cal.length-1)  
    var i = req[1]

    var liste = []
    while (to_date(cal[i]["DTEND"]) < date + 24*60*60*1000){
        liste.push(cal[i])
        i+=1
    }
    return liste
}

function convert_unix_to_local(unix){
    var offset = new Date().getTimezoneOffset();
    offset = offset*60*1000
    return new Date(unix-offset)
}

export default async function(){

    let url = "https://beaulieu-camp.github.io/api/"

    let req = await fetch(url + "salles.json")
    let resp = await req.json()

    let liste = {}

    for (let salle of resp) {

        let req2 = await fetch(url + salle[2] + ".json")
        let cal = await req2.json()
        let date = 1662981301 //parseInt(Date.now()/1000)

        liste[ salle[2] ] = salleLibres(cal,date)

        liste[ salle[2] ]["batiment"] = salle[0]
        liste[ salle[2] ]["salle"] = salle[1]

    }

    return liste
}