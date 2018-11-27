<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$recs = array();
if (isset($_GET['id'])) {
    $query = "SELECT * FROM `shift_transfer` WHERE `employee` = '" . $_GET['id'] . "'";
    $sel = mysqli_query($db, $query);
    while ($r = mysqli_fetch_assoc($sel)) {
        $query2 = "SELECT `kode`, `nama`, `jam_masuk`, `jam_keluar` FROM `shift` WHERE `id` = '" . $r['new_shift'] . "'";
        $sel2 = mysqli_query($db, $query2);
        $r2 = mysqli_fetch_assoc($sel2);
        $r['new_shift_data'] = $r2;

        $query3 = "SELECT `kode`, `nama`, `jam_masuk`, `jam_keluar` FROM `shift` WHERE `id` = '" . $r['old_shift'] . "'";
        $sel3 = mysqli_query($db, $query3);
        $r3 = mysqli_fetch_assoc($sel3);
        $r['old_shift_data'] = $r3;

        $recs[] = $r;
    }
}

echo json_encode($recs);
