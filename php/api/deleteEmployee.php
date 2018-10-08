<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['id'])) {
    $id = $_POST['id'];
    
    $sql = "DELETE FROM employee WHERE id='" . $id . "'";

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
