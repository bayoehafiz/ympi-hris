<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['obj'])) {
    $original_nik = $_POST['nik'];
    $data = $_POST['obj'];    
    $sql_sets = '';
    $arr_length = count($data);
    $counter=0;
    $nik = '';

    foreach ($data as $key => $value) {
        $counter++;

        if ($value['key'] == 'nik') {
            $nik = $value['value'];
            $sql_sets .= '`' . $value['key'] . '`=' . intval($value['value']);
        } else {
            $sql_sets .= '`' . $value['key'] . '`="' . $value['value'] . '"';
        }
            if ($counter != $arr_length) $sql_sets .= ', ';
    }

    // ChromePhp::log("UPDATE `employee` SET ".$sql_sets. " WHERE `nik` = ".$original_nik);
    
    $sql = "UPDATE `employee` SET ".$sql_sets. " WHERE `nik` = ".$original_nik;

    if($db->query($sql)){
        $res['status'] = 'ok';
    }else{
        $res['status'] = 'err';
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
