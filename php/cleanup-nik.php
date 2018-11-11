<?php
include "config/conn.php";
include "inc/chromePhp.php";

function removeNaN($nik)
{
    return preg_replace("/[^0-9]/", "", $nik);
}

$done = 0;
$failed = 0;
$empQuery = "SELECT
                `id`, `nik`
            FROM
                `employee`
            WHERE
                `status` = 'Percobaan'
                OR `status` = 'Kontrak 1'
                OR `status` = 'Kontrak 2'";

$empRecords = mysqli_query($db, $empQuery);
while ($r = mysqli_fetch_assoc($empRecords)) {
    $cleaned_nik = removeNaN($r['nik']);
    $sql = "UPDATE `employee` SET `nik` = " . $cleaned_nik . " WHERE `id` = " . $r['id'];
    if ($db->query($sql)) {
        $done++;
    } else {
        $failed++;
    }
}

$res['done'] = $done;
$res['failed'] = $failed;

// returns data as JSON format
echo json_encode($res);
