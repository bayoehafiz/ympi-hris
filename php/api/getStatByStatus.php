<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    status = 'Percobaan') AS total_percobaan,
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    status = 'Kontrak 1') AS total_kontrak_1,
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    status = 'Kontrak 2') AS total_kontrak_2,
            (SELECT
                    COUNT(*)
                FROM
                    `employee`
                WHERE
                    status = 'Tetap') AS total_tetap,
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
