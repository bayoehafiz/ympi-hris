<?php
// database details
$targetDbHost = 'localhost';
$targetDbPort = '3306';
$targetDbUsername = 'ympi';
$targetDbPassword = 'Hello123#';
$targetDbName = 'ympi_fingerspot';

// create connection and select DB
mysqli_report(MYSQLI_REPORT_STRICT);
try {
    $rdb = mysqli_connect($targetDbHost, $targetDbUsername, $targetDbPassword, $targetDbName);
} catch (Exception $e) {
    $res['error'] = true;
    $res['message'] = "DB Error: " . $e->getMessage() . ".\rPlease check your DB connection settings in \"php/api/remoteConn.php\"."; // not in live code obviously...
    echo json_encode($res);
    exit;
}
