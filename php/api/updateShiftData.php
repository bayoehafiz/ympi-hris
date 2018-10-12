<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['data'])) {
    $id = $_POST['id'];
    $data = $_POST['data'];
    $table = $_POST['table'];

    $sql_sets = "";
    $arr_length = count($data);
    $counter = 0;

    // Populate the SQL SET data
    foreach ($data as $key => $value) {
        $counter++;
        $sql_sets .= "`" . $value['key'] . "` = '" . $value['value'] . "'";
        if ($counter != $arr_length) {
            $sql_sets .= ", ";
        }
    }

    $sql = "UPDATE `{$table}` SET {$sql_sets}  WHERE id = '{$id}'";

    // ChromePhp::log($sql);

    if($db->query($sql)){
        $res['status'] = 'ok';
    }else{
        $res['status'] = 'err';
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    // //returns data as JSON format
    echo json_encode($res);
}
