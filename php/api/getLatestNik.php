<?php
include "../config/conn.php";
include "../inc/chromePhp.php";


$sql = "SELECT nik FROM `employee`";
$query = $db->query($sql);

if ($query->num_rows > 0) {
    $max = 0;
    while ($r = mysqli_fetch_assoc($query)) {
        $no = intval(substr($r['nik'], -4));
        if ($no > $max) $max = $no;
    }
    
    $data['success'] = true;
    $data['data'] = $max;
} else {
    $data['success'] = false;
    $data['message'] = "Database is empty!";
}

echo json_encode($data);
