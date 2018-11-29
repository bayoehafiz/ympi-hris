<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$type = $_POST['type'];

$sql = "SELECT 
            a.id, a.kode, a.nama, IFNULL(COUNT(b.employee), 0) AS total
        FROM
            `{$type}` a
                INNER JOIN
            `penugasan_shift` b ON b.{$type} = a.id
        GROUP BY a.id
        ORDER BY total DESC
        LIMIT 5";

$query = $db->query($sql);
$rows  = array();

print_r($sql);

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    }
    
    $data['success'] = true;
    $data['data']   = $rows;
} else {
    $data['status']  = 'err';
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
