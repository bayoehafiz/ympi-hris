<?php
include "config/conn.php";
include "inc/chromePhp.php";

function formatDate($olddate)
{
    if (strlen($olddate) > 8) {
        $standarddate = substr($olddate, 6, 4) . "-" . substr($olddate, 3, 2) . "-" . substr($olddate, 0, 2);
        return $standarddate;
    } else {
        return $olddate;
    }
}

$empQuery = "SELECT
                `id`, `nik`, `nama`, `tgl_lahir`, `tgl_masuk`, `tgl_keluar`
            FROM
                `employee`";

$empRecords = mysqli_query($db, $empQuery);
while ($r = mysqli_fetch_assoc($empRecords)) {
    $cleaned_tlg_lahir = formatDate($r['tgl_lahir']);
    $cleaned_tlg_masuk = formatDate($r['tgl_masuk']);
    if ($r['tgl_keluar'] !== null) {
        $tgl_keluar = ", `tgl_keluar` = '" . formatDate($r['tgl_keluar']) . "'";
    } else {
        $tgl_keluar = "";
    }

    $sql = "UPDATE `employee` SET `tgl_lahir` = '" . $cleaned_tlg_lahir . "', `tgl_masuk` = '" . $cleaned_tlg_masuk . "'" . $tgl_keluar . " WHERE `id` = " . $r['id'];
    if ($db->query($sql)) {
        echo "DONE >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    } else {
        echo "FAILED >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    }
}
