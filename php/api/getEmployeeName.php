<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['table'])) {
    $table = $_POST['table'];

    $query = $db->query("SELECT id, nama FROM `employee`");
    $rows = array();

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

    echo json_encode($data);
}


