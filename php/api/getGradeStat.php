<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_POST['table'];

// Check if field KODE is exists
$check = $db->query("SHOW COLUMNS FROM `{$table}` LIKE 'kode'");
$exists = ($check->num_rows > 0) ? TRUE : FALSE;
if ($exists) {
        $sql = "SELECT 
            a.`id`, a.`kode`, a.`nama`, COUNT(b.`id`) AS `total`
        FROM
            `{$table}` a
                LEFT JOIN
            `employee` b ON b.`{$table}` = a.`id` AND b.`active` = 1
        WHERE a.`active` = 1
        GROUP BY a.`id`
        ORDER BY a.`kode` ASC";
    } else {
        $sql = "SELECT 
            a.`id`, a.`nama`, a.`priority`, COUNT(b.`id`) AS `total`
        FROM
            `{$table}` a
                LEFT JOIN
            `employee` b ON b.`{$table}` = a.`id` AND b.`active` = 1
        WHERE a.`active` = 1
        GROUP BY a.`id`
        ORDER BY a.`priority` ASC";
    }


$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['success'] = false;

    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
