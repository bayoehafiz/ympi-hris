<?php
include "conn.php";
include "inc/chromePhp.php";

if (!empty($_POST['tanggal'])) {
    $query = $db->query("SELECT * FROM employee WHERE nik = '{$_POST['nik']}'");
    $rows = array();

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        }
        $data['status'] = 'ok';
        $data['result'] = $rows;
    } else {
        $data['status'] = 'err';
        $data['result'] = '';
    }

    //returns data as JSON format
    echo json_encode($data);
}
