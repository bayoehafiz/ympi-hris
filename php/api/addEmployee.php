<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['data'])) {
    $data = $_POST['data'];
    $sql_sets = '';
    $sql_values = '';
    $arr_length = count($data);
    $counter=0;

    foreach ($data as $key => $value) {

        if ($value['value'] != '') {
            $counter++;

            $sql_sets .= '`' . $value['key'] . '`';
            $sql_values .= '"' . $value['value'] . '"';

            // Remove comma [,] from last value of the array
            if ($counter != $arr_length) {
                $sql_sets .= ', ';
                $sql_values .= ', ';
            }
        }
    }

    $sql = "INSERT INTO `employee` (".$sql_sets.") VALUES (".$sql_values.")";
    // chromePhp::log($sql);
    if($db->query($sql)){
        $res['success'] = true;
    }else{
        $res['success'] = false;
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
