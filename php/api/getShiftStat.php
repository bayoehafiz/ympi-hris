<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

// $type = $_POST['type'];

$sql = "SELECT
        kode, nama, assignation_key, assignation_value
        FROM
        group_shift
        WHERE active = 1
        GROUP BY id";

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        // fetch total employee implied
        $sel = mysqli_query($db, "SELECT IFNULL(COUNT(*),0) AS total FROM `employee` WHERE " . $r['assignation_key'] . " = " . $r['assignation_value']);
        $rec = mysqli_fetch_assoc($sel);
        $r['total'] = $rec['total'];
        $rows[] = $r;
    }

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['status'] = 'err';
    $data['message'] = 'Data kosong!';
}

// ChromePhp::log($rows);

echo json_encode($data);
