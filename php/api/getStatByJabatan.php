<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT 
            a.`id`, a.`nama`, 
            (SELECT COUNT(*) FROM `employee` WHERE `jenis_kelamin` = 'Perempuan' AND active = 1 AND `penugasan` = a.`id`) AS total_p,
            (SELECT COUNT(*) FROM `employee` WHERE `jenis_kelamin` = 'Laki-laki' AND active = 1 AND `penugasan` = a.`id`) AS total_l
        FROM
            `penugasan` a
        WHERE
            a.`active` = 1
        GROUP BY a.`priority`";

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
