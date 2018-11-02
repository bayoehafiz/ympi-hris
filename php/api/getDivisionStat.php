<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_POST['table'];

// if table is Kode_bagian then limit it to 5 data only!
if ($table == 'kode_bagian') {
    $limit = 'LIMIT 5';
    $orderBy = 'ORDER BY total DESC';
    $where = 'WHERE a.active = 1';
} else {
    $limit = '';
    $orderBy = 'ORDER BY nama ASC';
    $where = '';
}

// Check if field KODE is exists
$check = $db->query("SHOW COLUMNS FROM `{$table}` LIKE 'kode'");
$exists = ($check->num_rows > 0) ? true : false;
if ($exists) {
    $sql = "SELECT
            a.kode, COUNT(b.id) AS total, active
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
            a.nama, COUNT(b.id) AS total, active
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
    ;

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['success'] = false;
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
