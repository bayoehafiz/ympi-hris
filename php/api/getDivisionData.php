<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['table'])) {
    $table = $_POST['table'];
    
    $sql = "SELECT * FROM " . $table . " WHERE active = 1 ORDER BY nama";
    $query = $db->query($sql);
    $rows = array();

    // ChromePhp::log($sql);

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

    //returns data as JSON format
    echo json_encode($data);
}
