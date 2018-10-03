<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['table'])) {
    $table = 'tbl_' . $_POST['table'];

    $query = $db->query("SELECT * FROM " . $table);
    $rows = array();

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        };

        $data['status'] = 'ok';
        $data['data'] = $rows;
    } else {
        $data['status'] = 'err';
        $data['data'] = '';
    }

    echo json_encode($data);
}


