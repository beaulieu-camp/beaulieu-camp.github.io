import { writable, type Writable } from 'svelte/store';

export let created = writable()

export type values = {id:string,name:string,checked:boolean}[]

export class dialog {
    values:Writable<values> = writable([])
    callback:Function = ()=>{}
    element
    
    constructor(el:HTMLDialogElement){
        this.element = el
        created.set(this)
    }
    
    close(){
        this.element.close()
        let liste:string[] = []

        this.values.subscribe((val) => {
            for (let input of val ){
                if (input.checked) liste.push( input.id ) 
            }
        })
        
        this.callback(liste)

    }

    open(values:values,callback:Function){
        this.values.set(values)
        this.callback = callback
        
        this.element.showModal()
    }
}