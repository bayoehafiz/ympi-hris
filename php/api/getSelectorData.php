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
        $sql = "SELECT `id`, `kode`, `nama` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `priority`";
    }else if ($table == 'penugasan') {
        $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `priority`";
    } else if ($table == 'kode_bagian') {
        $sql = "SELECT `id`, `kode`, `bagian_key`, `bagian_value` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `kode`";
    }  else {
        $sql = "SELECT `id`, `nama` AS `text` FROM `" . $table . "` WHERE `active` = 1" . $where . " ORDER BY `nama`";
    }
}

// ChromePhp::log($sql);

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    if ($table == 'kode_bagian') {
        // manipulate kode_bagian
        $counter = 0;
        while ($d = mysqli_fetch_assoc($query)) {
            $rows[$counter]['id'] = $d['id'];
            $rows[$counter]['kode'] = $d['kode'];

            switch($d['bagian_key']) {
                case 'division': $bagian_key = 'Divisi'; break;
                case 'department': $bagian_key = 'Departemen'; break;
                case 'section': $bagian_key = 'Section'; break;
                case 'sub_section': $bagian_key = 'Sub Section'; break;
                case 'group': $bagian_key = 'Grup'; break;
                default: break;
            }
            $rows[$counter]['bagian_key'] = $bagian_key;

            $sel = mysqli_query($db, "SELECT nama FROM `" . $d['bagian_key'] . "` WHERE `id` = " . $d['bagian_value']);
            $rec = mysqli_fetch_assoc($sel);
            $rows[$counter]['nama'] = $rec['nama'];

            $counter++;
        }
    } else {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        }
    }
}

echo json_encode($rows);
