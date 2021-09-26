<?php
//header('Content-Type: application/json');
//error_reporting(0);
date_default_timezone_set('Europe/Paris');

    $data = json_decode(file_get_contents("php://input"));

    $file = json_decode(file_get_contents("polygons.json"));

    foreach ($data as $key => $value){
	$key = intval($key);
        if (!isset($file[$key])){
            $file[$key] = array();
            foreach ($value as $key2 => $value2){
                $file[$key][$key2] = $value2;
            }
        }
        else{
            foreach ($value as $key2 => $value2){
                $file[$key][$key2] = $value2;
            }
        }
        
    }

	$fp = fopen('polygons.json', 'w');
	fwrite($fp, json_encode($file));
	fclose($fp);
?>