<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['data'])) {
    $id = $_POST['id'];
    $data = $_POST['data'];
    $sql_sets = "";

    // Populate the SQL SET data
    foreach ($data as $key => $value) {
        $sql_sets .= "`" . $value['key'] . "` = '" . $value['value'] . "',";
    }

    $sql = "UPDATE `employee` SET {$sql_sets} `active` = 0 WHERE id = '{$id}'";

    ChromePhp::log($sql);

    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }
    // //returns data as JSON format
    echo json_encode($res);
}
