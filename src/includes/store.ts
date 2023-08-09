type config = {
    [ key : string ] : any
}

export class configuration {
    config:config = {"salles":[]}

    constructor(){
        let config_stored = window.sessionStorage.getItem("configuration")
        if  ( config_stored ) this.config = JSON.parse(config_stored)
    }

    all(){
        return this.config
    }

    get(attribute:string) {
        return this.config[attribute]
    }

    set(attribute:string, value:any){
        this.config[attribute] = value
        this.save()
    }

    save() {
        window.sessionStorage.setItem("configuration", JSON.stringify(this.config) )
    }

}