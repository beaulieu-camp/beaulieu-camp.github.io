type config = {
    [ key : string ] : any
}

export class configuration {
    config:config = {}

    constructor(){
        let config_stored = window.sessionStorage.getItem("configuration")
        if  ( config_stored ) this.config = JSON.parse(config_stored)
    }

    all(){
        return this.config
    }

    get(attribute:string) {
        if (this.config[attribute]) return this.config[attribute]
        else return []
    }

    set(attribute:string, value:any){
        this.config[attribute] = value
        this.save()
    }

    save() {
        window.sessionStorage.setItem("configuration", JSON.stringify(this.config) )
    }

    import(newconfig:config){
        this.config=newconfig
        this.save()
    }

}