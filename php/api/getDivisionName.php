<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['table'])) {
    $table = $_POST['table'];
    $id = $_POST['id'];
    
    $sql = "SELECT nama FROM `{$table}` WHERE id = {$id} LIMIT 1";
    $query = $db->query($sql);
    $rows = array();

    // ChromePhp::log($sql);

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        };

        $data['success'] = true;
        $data['data'] = $rows;
    } else {
        $data['success'] = false;
        $data['data'] = '';
    }

    //returns data as JSON format
    echo json_encode($data);
}
