<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$targetDbHost = 'localhost';
$targetDbPort = '3306';
$targetDbUsername = 'ympi';
$targetDbPassword = 'Hello123#';
$targetDbName = 'ympi_fingerspot';

try {
    $rdb = new mysqli($targetDbHost, $targetDbUsername, $targetDbPassword, $targetDbName);
} catch (Exception $e) {
    $res['succes'] = false;
    $res['message'] = "DB Error: " . $e->getMessage() . ".\rPlease check your DB connection settings in \"php/api/conn.php\"."; // not in live code obviously...
    echo json_encode($res);
    exit;
}

$error_counter = 0;
$success_counter = 0;

// Get remote data
$rQuery = "SELECT 
        b.nik, a.pin, a.scan_date
        FROM
        att_log a
            LEFT JOIN
        emp b ON b.pin = a.pin
        WHERE
        b.nik IS NOT NULL
        LIMIT 10";

$rSel = mysqli_query($rdb, $rQuery);
$query = $rdb->query($rSel);
ChromePhp::log($query);
$rows = [];
while ($r = mysqli_fetch_assoc($query)) {



    $rows[] = $r;
    // Inject the SQL SET data
    $updateQuery = "INSERT INTO 'presence' ('nik', 'pin', 'scan_date') VALUES (" . $r['nik'] . ", " . $r['pin'] . ", " . $r['scan_data'] . ")";

    if ($db->query($updateQuery)) {
        $success_counter++;
    } else {
        $error_counter++;
    }
}

$res['success'] = true;
$res['data']['success'] = $success_counter;
$res['data']['error'] = $error_counter;

echo json_encode($res);
