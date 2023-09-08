<script lang="ts">
    import { onMount } from "svelte";

    export let title:String
    export let params_callback: Function|undefined
    let slide:HTMLElement
    let last = 0
    let touched = false
    let vel = 0
    let lastt = 0

    import Card from "$lib/Card.svelte"
    import Icons from "./Icons.svelte";

    function smooth(chrono:number) {

        if (lastt != 0 && !touched){
            let dt = chrono-lastt
            slide.scrollBy({left: -vel*dt})
            last = slide.scrollLeft
            let signe = Math.sign(vel)
            
            vel = signe * ( Math.sqrt( signe * vel ) - dt/500 )**2
        }

        lastt = chrono

        if (vel**2 > 0.1 && !touched) {
            window.requestAnimationFrame(smooth)
        }
        else{
            lastt = 0
        }

    }

    onMount(async() =>{
        const Hammer = await import("hammerjs")
        const mc = new Hammer.Manager(slide,{
            recognizers: [
                [Hammer.Pan,{ direction: Hammer.DIRECTION_HORIZONTAL }],
            ]
        });

        mc.on("pan", function(ev) {
            if (ev.isFinal) {
                last = slide.scrollLeft
                vel = ev.overallVelocityX
                window.requestAnimationFrame(smooth);
            }
            else if (touched) {  
                slide.scrollTo( last - ev.deltaX , 0)
            }
        });

        slide.addEventListener("pointerdown", function (e) {
            touched = true
        })

        slide.addEventListener("pointerup", function (e) {
            touched = false
        })
        
    })
    let sens = "arrowright"

    function autoflow(){
        if ( slide.style.gridAutoFlow == "unset" ) {
            slide.style.gridAutoFlow = "column" 
            sens = "arrowright"
        }
        else {
            slide.style.gridAutoFlow = "unset" 
            sens = "arrowbottom"
        }
    }

</script>



<Card title={title} params_callback={params_callback}>
    
    <button class="iconbtn" on:click={ autoflow }><Icons width="20" name={sens}></Icons></button>
    <div class="flex" bind:this={slide}>
        <slot></slot>
    </div>
</Card>



<style>
    button {
        width:  52px;
        margin-left: 16px;
        margin-top: 16px;
    }
    div.flex {
        /* scroll-behavior: smooth; */

        overflow: overlay;
        display: grid;
        padding: 16px;
        width: calc( 100% - 32px ) ;
        gap : 16px;
        grid-template-rows: 1fr;
        grid-auto-columns: 300px;
        grid-auto-flow: column;
        overflow: hidden;
    }

</style>