<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_POST['table'];

$sql = "SELECT 
        COUNT(id) as `divisi`,
        (SELECT COUNT(id) FROM `department` WHERE active = 1) AS `departemen`,
        (SELECT COUNT(id) FROM `section` WHERE active = 1) AS `section`,
        (SELECT COUNT(id) FROM `sub_section` WHERE active = 1) AS `sub section`,
        (SELECT COUNT(id) FROM `group` WHERE active = 1) AS `grup`
        FROM 
        `division`
        WHERE 
        active = 1";

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
    $data['success'] = false;
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
