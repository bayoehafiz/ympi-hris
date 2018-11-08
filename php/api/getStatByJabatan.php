<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            a.id, a.nama, COUNT(b.id) AS total
        FROM
            penugasan a
            LEFT JOIN
                employee b ON b.penugasan = a.id
        WHERE
            a.active = 1
        GROUP BY a.id";

// ChromePhp::log($sql);

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    }

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['status'] = 'err';
}

echo json_encode($data);
