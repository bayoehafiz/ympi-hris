<?php
include "config/conn.php";
include "inc/chromePhp.php";

function setKontrak($date, $duration)
{
    $dur = ' + ' . $duration . ' month';
    return date("d-m-Y", strtotime(date('d-m-Y', strtotime($dur, strtotime($date)))));
}

$empQuery = "SELECT
                `id`, `nik`, `nama`, `status`, `tgl_masuk`
            FROM
                `employee`
            WHERE
                `status` = 'Percobaan'
                OR `status` = 'Kontrak 1'
                OR `status` = 'Kontrak 2'";

$empRecords = mysqli_query($db, $empQuery);
while ($r = mysqli_fetch_assoc($empRecords)) {
    if ($r['status'] == "Kontrak 1") {
        $d = 12;
    } else if ($r['status'] == "Kontrak 2") {
        $d = 24;
    } else {
        $d = 3;
    }

    $cleaned_tgl_keluar = setKontrak($r['tgl_masuk'], $d);

    $sql = "UPDATE `employee` SET `masa_kontrak` = " . $d . ", `tgl_keluar` = '" . $cleaned_tgl_keluar . "' WHERE `id` = " . $r['id'];
    if ($db->query($sql)) {
        echo "DONE >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    } else {
        echo "FAILED >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    }
}
