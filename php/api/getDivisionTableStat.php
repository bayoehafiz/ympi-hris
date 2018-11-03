<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_POST['table'];

$where = '';
$orderBy = 'ORDER BY nama ASC';
$limit = '';

// Check if field KODE is exists
$check = $db->query("SHOW COLUMNS FROM `{$table}` LIKE 'kode'");
$exists = ($check->num_rows > 0) ? true : false;
if ($exists) {
    $sql = "SELECT
            a.id, a.kode, COUNT(b.id) AS total, active
        FROM
            `{$table}` a
                LEFT JOIN
            employee b ON b.{$table} = a.id
        {$where}
        GROUP BY a.id
        {$orderBy}
        {$limit}";
} else {
    $sql = "SELECT
            a.id, a.nama, COUNT(b.id) AS total, active
        FROM
            `{$table}` a
                LEFT JOIN
            employee b ON b.{$table} = a.id
        {$where}
        GROUP BY a.id
        {$orderBy}
        {$limit}";
}

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
