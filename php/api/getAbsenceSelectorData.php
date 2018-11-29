<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

// search query
$where = "";
if (isset($_GET['q'])) {
    $searchValue = $_GET['q'];
    $where = " AND (`kode` like '%" . $searchValue . "%' or
                `jenis` like '%" . $searchValue . "%')";
}

$sql = "SELECT * FROM `absence` WHERE active = 1" . $where . " ORDER BY kode";
// ChromePhp::log($sql);

// paging
if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $resultCount = 10;
    $end = ($page - 1) * $resultCount;
    $start = $end + $resultCount;
    $sql .= " LIMIT " . $end . ", " . $start;
}

$query = $db->query($sql);
$rows = array();
$count = $query->num_rows;

if ($query->num_rows > 0) {
    $counter = 0;
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[$counter] = $r;
        $rows[$counter]['total_count'] = $count;
        $counter++;
    }
}

echo json_encode($rows);
