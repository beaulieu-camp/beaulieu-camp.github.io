<?php

header("Access-Control-Allow-Origin: *");

if($_GET["q"] == "biblio"){
    $link = "https://univ-rennes1.libcal.com/widget/hours/grid?systemTime=1&date=";
    if (isset($_GET["date"])){
        $link = $link . $_GET["date"];
    }
}
else if($_GET["q"] == "agenda"){
    $link = "https://agenda.univ-rennes1.fr/events";
}
else if($_GET["q"] == "resto-u"){
    $link = "https://www.crous-rennes.fr/restaurant/resto-u-" . $_GET["t"];
}

$api = file_get_contents($link);

if($_GET["q"] == "agenda"){
    $api = json_decode($api) -> {"html"};
}

$api = str_replace("<script","<!--",$api);
$api = str_replace("</script>","-->",$api);
$api = str_replace("\\\"","\"",$api);
$api = str_replace("\\n","<br/>",$api);
$api = str_replace("\n","",$api);
$api = str_replace("  ","",$api);
echo $api;

?>