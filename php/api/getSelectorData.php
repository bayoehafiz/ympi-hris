<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_GET['table'];

$where = "";
if (isset($_GET['q'])) {
    $searchValue = $_GET['q'];
    if ($table == 'grade') {
        $where = " AND (`nama` like '%" . $searchValue . "%' or
                    `kode` like '%" . $searchValue . "%')";
    } else if ($table == 'kode_bagian') {
        $where = " AND (`kode` like '%" . $searchValue . "%')";
    } else {
        $where = " AND (`nama` like '%" . $searchValue . "%')";
    }
}

if (isset($_GET['parent'])) {
    $parent = $_GET['parent'];
    $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1 AND `parent` = " . $parent . $where . " ORDER BY nama";
} else {
    if ($table == 'grade') {
        $sql = "SELECT `id`, `kode`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `kode`";
    } else if ($table == 'kode_bagian') {
        $sql = "SELECT `id`, `kode` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `kode`";
    } else {
        $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `nama`";
    }
}

// ChromePhp::log($sql);

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    }
}

echo json_encode($rows);
