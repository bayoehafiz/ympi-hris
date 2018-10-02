<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$query = $db->query("SELECT * FROM division ORDER BY id");
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['status'] = 'ok';
    $data['data'] = $rows;
} else {
    $data['status'] = 'err';
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
