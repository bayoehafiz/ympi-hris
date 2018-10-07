<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['table'])) {
    $table = $_POST['table'];
    // ChromePhp::log($table);

    if ($table == 'division') $sql = "SELECT a.id, a.nama, a.kode, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `division` a LEFT JOIN `department` b ON a.id = b.parent GROUP BY a.id";

    else if ($table == 'department') $sql = "SELECT a.id, a.nama, a.kode, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `department` a LEFT JOIN `section` b ON a.id  = b.parent LEFT JOIN `division` c ON a.parent = c.id GROUP BY a.id";

    else if ($table == 'section') $sql = "SELECT a.id, a.nama, a.kode, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `section` a LEFT JOIN `sub_section` b ON a.id  = b.parent LEFT JOIN `department` c ON a.parent = c.id GROUP BY a.id";

    else if ($table == 'sub_section') $sql = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `sub_section` a LEFT JOIN `group` b ON a.id  = b.parent LEFT JOIN `section` c ON a.parent = c.id GROUP BY a.id";

    else $sql = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated FROM `sub_section` a LEFT JOIN `section` c ON a.parent = c.id GROUP BY a.id";

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


