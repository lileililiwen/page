<?php

function getAlexaRank($Domain)
{
    $line = "";
    $data = "";
    $URL = "http://data.alexa.com/data/?cli=10&dat=snbamz&url=" . $Domain;
    $fp = fopen($URL, "r");
    $arr=array();
    if ($fp) {
        while (! feof($fp)) {
            $line = fgets($fp);
            $data .= $line;
        }
        $p = xml_parser_create();
        xml_parse_into_struct($p, $data, $vals);
        xml_parser_free($p);
        for ($i = 0; $i < count($vals); $i ++) {
            if ($vals[$i]["tag"] == "POPULARITY") {
                //全球排名
                $arr["globalRank"] =  $vals[$i]["attributes"]["TEXT"];
            }
            if ($vals[$i]["tag"] == "REACH") {
                //访客排名
                $arr["visitCountRank"] =  $vals[$i]["attributes"]["RANK"];
            }
            if ($vals[$i]["tag"] == "COUNTRY") {
                //国家
                $arr["country"] =  $vals[$i]["attributes"]["NAME"];
                //国家地区排名
                $arr["countryRank"] =  $vals[$i]["attributes"]["RANK"];
            }
            if ($vals[$i]["tag"] == "RANK") {
                //排名变化，上升为负数
                $arr["rankDeta"] =  $vals[$i]["attributes"]["DELTA"];
            }
        }
        $arr["domainName"] =  $Domain;
    }
    return json_encode($arr);
}
header('Content-Type:application/json; charset=utf-8');
print(getAlexaRank(trim($_REQUEST['domainName'])));
?>