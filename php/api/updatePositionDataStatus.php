<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $table = $_POST['table'];    
    $status = $_POST['status'];
    $sql_val = 1;
    $timestamp = date("Y-m-d H:i:s");

    if ($status == '1' || $status == 1) $sql_val = 0;
    
    $sql = "UPDATE " . $table . " SET active=" . $sql_val . ", updated='" . $timestamp . "' WHERE id = " . $id;

    // ChromePhp::log($sql);

    if ($db->query($sql)) {
        $res['status'] = 'ok';
        $res['message'] = 'Status berhasil dirubah';
    } else {
        $res['status'] = 'err';
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
