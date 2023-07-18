

(async function() {

    let req  = await fetch("https://planning.univ-rennes1.fr/jsp/webapi", {
        "headers": {
            "Content-Type": "text/x-gwt-rpc; charset=utf-8",

            "data":"getEvents",
        },
        "method": "GET",
    });
})()

