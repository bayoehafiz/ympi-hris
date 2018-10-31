<?php
//database details
$dbHost = 'localhost';
$dbUsername = 'ympi';
$dbPassword = 'Hello123#';
$dbName = 'ympi_hris';

//create connection and select DB
mysqli_report(MYSQLI_REPORT_STRICT);
try {
    $db = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
} catch (Exception $e) {
    $res['error'] = true;
    $res['message'] = "DB Error: " . $e->getMessage() . ".\rPlease check your DB connection settings in \"php/api/conn.php\"."; // not in live code obviously...
    echo json_encode($res);
    exit;
}