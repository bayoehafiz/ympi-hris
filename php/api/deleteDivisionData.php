<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['id'])) {
    $id = $_POST['id'];
    $table = 'tbl_' . $_POST['table'];
    
    $sql = "DELETE FROM " . $table . " WHERE id = " . intval($id);

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
