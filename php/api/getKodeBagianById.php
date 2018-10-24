<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "SELECT * FROM `kode_bagian` WHERE id = {$id} LIMIT 1";

    $query = $db->query($sql);
    $rows = array();

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        };

        $data['success'] = true;
        $data['data'] = $rows;
    } else {
        $data['success'] = false;
        $data['data'] = '';
    }

    echo json_encode($data);
}
