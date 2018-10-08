<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            a.nama, a.kode, COUNT(b.id) AS total
        FROM
            division a
                LEFT JOIN
            employee b ON b.division = a.id
        WHERE
            active = 1
        GROUP BY nama
        ORDER BY kode";

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
