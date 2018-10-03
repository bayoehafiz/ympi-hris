<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$query = $db->query("SELECT COUNT(a.id) as tot_jabatan, COUNT(b.id) as tot_grade, COUNT(c.id) as tot_penugasan FROM tbl_jabatan a, tbl_grade b, tbl_penugasan c ORDER BY a.id");
$rows = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['status'] = 'ok';
    $data['data'] = $rows;
} else {
    $data['status'] = 'err';
    $data['message'] = 'Data kosong!';
}

echo json_encode($data);
