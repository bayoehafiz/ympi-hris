<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_GET['table'];

// search query
$where = "";
if (isset($_GET['q'])) {
    $searchValue = $_GET['q'];
    if ($table == 'employee') {
        $where = " AND (`nama` like '%" . $searchValue . "%' or
                    `nik` like '%" . $searchValue . "%')";
    } else if ($table == 'grade' || $table == 'shift') {
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
    $sql = "SELECT `id`, `nama` AS `text`, `nik` FROM `" . $table . "` WHERE `active` = 1 AND `parent` = " . $parent . $where . " ORDER BY nama";
} else {
    if ($table == 'employee') {
        $sql = "SELECT `id`, `nik`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `nama`";
    } else if ($table == 'grade') {
        $sql = "SELECT `id`, `kode`, `nama` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `priority`";
    } else if ($table == 'penugasan') {
        $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `priority`";
    } else if ($table == 'kode_bagian') {
        $sql = "SELECT `id`, `kode`, `bagian_key`, `bagian_value` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `kode`";
    } else if ($table == 'shift') {
        $sql = "SELECT `id`, `kode`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `nama`";
    } else {
        $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `nama`";
    }
}



// paging
if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $resultCount = 10;
    $end = ($page - 1) * $resultCount;
    $start = $end + $resultCount;
    $sql .= " LIMIT " . $end . ", " . $start;
}

// print_r($sql);

$query = $db->query($sql);
$rows = array();

$count = $query->num_rows;

if ($query->num_rows > 0) {
    if ($table == 'kode_bagian') {
        // manipulate kode_bagian
        $counter = 0;
        while ($d = mysqli_fetch_assoc($query)) {
            $rows[$counter]['id'] = $d['id'];
            $rows[$counter]['kode'] = $d['kode'];

            switch ($d['bagian_key']) {
                case 'division':$bagian_key = 'Divisi';
                    break;
                case 'department':$bagian_key = 'Departemen';
                    break;
                case 'section':$bagian_key = 'Section';
                    break;
                case 'sub_section':$bagian_key = 'Sub Section';
                    break;
                case 'group':$bagian_key = 'Grup';
                    break;
                default:break;
            }
            $rows[$counter]['bagian_key'] = $bagian_key;

            $sel = mysqli_query($db, "SELECT nama FROM `" . $d['bagian_key'] . "` WHERE `id` = " . $d['bagian_value']);
            $rec = mysqli_fetch_assoc($sel);
            $rows[$counter]['nama'] = $rec['nama'];
            $rows[$counter]['total_count'] = $count;

            $counter++;
        }
    } else {
        $counter = 0;
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[$counter] = $r;
            $rows[$counter]['total_count'] = $count;
            $counter++;
        }
    }
}

echo json_encode($rows);
