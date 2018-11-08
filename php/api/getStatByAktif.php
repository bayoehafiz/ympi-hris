<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    `active` = 1) AS total_aktif,
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    `active` = 0) AS total_non_aktif,
            COUNT(*) AS total
            FROM
            `employee`
            LIMIT 1";

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
