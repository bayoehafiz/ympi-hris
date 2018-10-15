<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['obj'])) {
    $data = $_POST['obj'];    
    $table = $_POST['table']; 
    $sql_sets = '';
    $sql_values = '';
    $arr_length = count($data);
    $counter=0;

    foreach ($data as $key => $value) {

        if ($value['value'] != '') {
            $counter++;

            if ($value['key'] == 'nik') {
                $sql_sets .= '`' . $value['key'] . '`';
                $sql_values .= intval($value['value']);
            } else {
                $sql_sets .= '`' . $value['key'] . '`';
                $sql_values .= '"' . $value['value'] . '"';
            }

            if ($counter != $arr_length) {
                $sql_sets .= ', '; 
                $sql_values .= ', ';
            }
        }
    }
    
    $sql = "INSERT INTO " . $table . " (".$sql_sets.") VALUES (".$sql_values.")";

    if($db->query($sql)){
        $res['success'] = true;
    }else{
        $res['success'] = false;
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
