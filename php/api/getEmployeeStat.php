<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
    COUNT(*) AS `Percobaan`,
    (SELECT COUNT(*) FROM employee WHERE status = 'Kontrak 1') as `Kontrak 1`,
    (SELECT COUNT(*) FROM employee WHERE status = 'Kontrak 2') as `Kontrak 2`,
    (SELECT COUNT(*) FROM employee WHERE status = 'Tetap') as `Tetap`
    FROM employee
    WHERE active = 1";

// ChromePhp::log($sql);

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['success'] = false;
    $data['message'] = '';
}

echo json_encode($data);
