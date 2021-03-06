<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            COUNT(*) AS `Percobaan`,
            (SELECT COUNT(*) FROM `employee` WHERE `status` = 'Kontrak 1' and `active` = 1) as `Kontrak 1`,
            (SELECT COUNT(*) FROM `employee` WHERE `status` = 'Kontrak 2' and `active` = 1) as `Kontrak 2`,
            (SELECT COUNT(*) FROM `employee` WHERE `status` = 'Tetap'  and `active` = 1) as `Tetap`,
            (SELECT COUNT(*) FROM `employee` WHERE (`status` = 'Percobaan' OR `status` = 'Kontrak 1' OR `status` = 'Kontrak 2' OR `status` = 'Tetap') and `active` = 1) as `Total Aktif`,
            (SELECT COUNT(*) FROM `employee` WHERE `active` = 0) as `Total Non Aktif`
        FROM `employee`
        WHERE `active` = 1 and `status` = 'Percobaan'";

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
