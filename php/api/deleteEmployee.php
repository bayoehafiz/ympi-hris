<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $sql = "DELETE FROM employee WHERE id='" . $id . "'";

    if($db->query($sql)){
        $res['success'] = true;
        $res['message'] = 'Data berhasil dihapus';
    }else{
        $res['success'] = false;
        $res['message'] = '('. $db->errno .') '. $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
