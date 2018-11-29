<?php
include "../config/remoteConn.php";
include "../config/conn.php";
include "../inc/chromePhp.php";

$start = $_GET['start'];
$error_counter = 0;
$success_counter = 0;
$rows = [];

// Truncate the destination table first
$q = "TRUNCATE `attendance`";
if ($db->query($q)) {

    // Get remote data
    $now = date("Y-m-d H:i:s");
    $sql = "SELECT
            a.`pin`, a.`scan_date`, b.`nik`
        FROM
            `att_log` a
                LEFT JOIN
            `emp` b ON b.`pin` = a.`pin`
        WHERE
            b.`nik` IS NOT NULL AND a.`scan_date` BETWEEN '" . $start . "' AND '" . $now . "'";
    $sel = mysqli_query($rdb, $sql);

    while ($r = mysqli_fetch_assoc($sel)) {
        // remove * mark from NIK
        $nik = str_replace('*', '', $r['nik']);
        
        // Inject the imported SQL SET data
        $updateQuery = "INSERT INTO `attendance` (`nik`, `pin`, `scan_date`)
            VALUES ('" . $nik . "', '" . $r['pin'] . "', '" . $r['scan_date'] . "')";
        // print_r($updateQuery);
        if ($db->query($updateQuery)) {
            $success_counter++;
        } else {
            $error_counter++;
            $res['data']['error_msg'][$error_counter] = '(' . $db->errno . ') ' . $db->error;
        }
    }

    $res['success'] = true;
    $res['data']['success'] = $success_counter;
    $res['data']['error'] = $error_counter;

} else {
    $res['success'] = false;
    $res['data'] = "Error truncating destination table!";
}

echo json_encode($res);
