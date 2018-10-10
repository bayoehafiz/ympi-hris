<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            status, IFNULL(COUNT(*), 0) AS total
        FROM
            employee
        GROUP BY status
        ORDER BY status";

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['status'] = 'ok';
    $data['data'] = $rows;
} else {
    $data['status'] = 'err';
    $data['message'] = '';
}

echo json_encode($data);
