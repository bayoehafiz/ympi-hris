<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$initSql = "SELECT
        `id`, `kode`, `division`, `department`, `section`, `sub_section`, `group`
    FROM
        `kode_bagian`
    WHERE
        `active` = 1
    ORDER BY `kode` ASC";

$initQuery = $db->query($initSql);

$data = [];
$rows = [];

if ($initQuery->num_rows > 0) {
    $counter = 0;
    while ($r = mysqli_fetch_assoc($initQuery)) {
        // $rows[$counter]['id'] = $r['id'];
        $rows[$counter]['nama'] = $r['kode'];

        // Find the smallest unit
        $childest = null;
        $t = null;
        if ($r['group'] != null) {
            $childest = $r['group'];
            $t = 'group';
        } else {
            if ($r['sub_section'] != null) {
                $childest = $r['sub_section'];
                $t = 'sub_section';
            } else {
                if ($r['section'] != null) {
                    $childest = $r['section'];
                    $t = 'section';
                } else {
                    if ($r['department'] != null) {
                        $childest = $r['department'];
                        $t = 'department';
                    } else {
                        $childest = $r['division'];
                        $t = 'division';
                    }
                }
            }
        }

        // Find the employee total
        $sql = "SELECT  
                COUNT(*) AS total_p,
                (SELECT COUNT(*) FROM `employee` WHERE `jenis_kelamin` = 'Laki-laki' AND active = 1 AND `{$t}` = {$childest}) AS total_l
            FROM
                `employee`
            WHERE 
                `jenis_kelamin` = 'Perempuan' AND active = 1 AND `{$t}` = {$childest}";

        $sel = mysqli_query($db, $sql);
        $tot = mysqli_fetch_assoc($sel);

        $rows[$counter]['total_p'] = $tot['total_p'];
        $rows[$counter]['total_l'] = $tot['total_l'];

        $counter++;
    }
}

$data['success'] = true;
$data['data'] = $rows;

// ChromePhp::log($rows);

echo json_encode($data);
