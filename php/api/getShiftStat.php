<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT
        `kode`, `nama`, `assignation_key`, `assignation_value`
        FROM
        `group_shift`
        WHERE `active` = 1
        GROUP BY `id`";

$query = $db->query($sql);
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        // fetch total employee implied
        $total_e = 0;
        $vals = explode(',', $r['assignation_value']);
        if ($r['assignation_key'] != 'employee') {
            foreach ($vals as $val) {
                $sel = mysqli_query($db, "SELECT IFNULL(COUNT(*),0) AS `total` FROM `employee` WHERE `" . $r['assignation_key'] . "` = " . $val);
                $rec = mysqli_fetch_assoc($sel);
                $total_e = $total_e + $rec['total'];
            }
        } else {
            $total_e = sizeof($vals);
        }
        $r['total'] = $total_e;
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
