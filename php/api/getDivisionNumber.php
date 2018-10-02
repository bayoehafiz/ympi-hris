<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$query = $db->query("SELECT COUNT(a.id) as tot_division, COUNT(b.id) as tot_department, COUNT(c.id) as tot_section, COUNT(d.id) as tot_sub_section, COUNT(c.id) as tot_group FROM tbl_division a, tbl_department b, tbl_section c, tbl_sub_section d, tbl_group e ORDER BY a.id");
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
