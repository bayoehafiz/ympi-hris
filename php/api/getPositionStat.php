<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            a.nama, COUNT(b.id) AS total
        FROM
            jabatan a
                LEFT JOIN
            employee b ON b.jabatan = a.id
        WHERE a.active = 1
        GROUP BY a.id
        ORDER BY total DESC
        LIMIT 5";

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
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
