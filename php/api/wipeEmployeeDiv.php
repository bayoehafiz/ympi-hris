<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $sql = "UPDATE `employee` 
        SET `division` = null, 
            `department` = null, 
            `section` = null, 
            `sub_section` = null, 
            `group` = null  
        WHERE id = '{$id}'";

    // ChromePhp::log($sql);

    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }
    
    //returns data as JSON format
    echo json_encode($res);
}
