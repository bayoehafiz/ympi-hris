<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['nik'])) {
    $nik = $_POST['nik'];
    
    $sql = "DELETE FROM `employee` WHERE `nik`=" . intval($nik);

    if($db->query($sql)){
        $res['status'] = 'ok';
        $res['message'] = 'Data berhasil dihapus';
    }else{
        $res['status'] = 'err';
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
