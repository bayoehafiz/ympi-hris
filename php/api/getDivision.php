<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['table'])) {
    $table = 'tbl_' . $_POST['table'];

    if ($table == 'tbl_division') $sql = "SELECT a.id, a.nama, a.kode, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM tbl_division a LEFT JOIN tbl_department b ON a.id = b.parent GROUP BY b.parent";

    else if ($table == 'tbl_department') $sql = "SELECT a.id, a.nama, a.kode, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM tbl_department a LEFT JOIN tbl_section b ON a.id  = b.parent LEFT JOIN tbl_division c ON a.parent = c.id GROUP BY b.parent";

    else if ($table == 'tbl_section') $sql = "SELECT a.id, a.nama, a.kode, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM tbl_section a LEFT JOIN tbl_sub_section b ON a.id  = b.parent LEFT JOIN tbl_department c ON a.parent = c.id GROUP BY b.parent";

    else if ($table == 'tbl_sub_section') $sql = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM tbl_sub_section a LEFT JOIN tbl_group b ON a.id  = b.parent LEFT JOIN tbl_section c ON a.parent = c.id GROUP BY b.parent";

    else $sql = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated FROM tbl_sub_section a LEFT JOIN tbl_section c ON a.parent = c.id GROUP BY a.parent";

    $query = $db->query($sql);
    $rows = array();

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        };

        $data['status'] = 'ok';
        $data['data'] = $rows;
    } else {
        $data['status'] = 'err';
        $data['data'] = '';
    }

    echo json_encode($data);
}


