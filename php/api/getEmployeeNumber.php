<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$query = $db->query("SELECT division, COUNT(*) AS total FROM employee GROUP BY division");
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
