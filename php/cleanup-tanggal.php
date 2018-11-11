<?php
include "config/conn.php";
include "inc/chromePhp.php";

function formatDate($olddate)
{
    if (strlen($olddate) < 10) {
        if (substr($olddate, 6, 2) >= 50) {
            $standarddate = substr($olddate, 0, 2) . "-" . substr($olddate, 3, 2) . "-19" . substr($olddate, 6, 2);
        } else {
            $standarddate = substr($olddate, 0, 2) . "-" . substr($olddate, 3, 2) . "-20" . substr($olddate, 6, 2);
        }
        return $standarddate;
    } else {
        return $olddate;
    }
}

$empQuery = "SELECT
                `id`, `nik`, `nama`, `tgl_lahir`, `tgl_masuk`
            FROM
                `employee`";

$empRecords = mysqli_query($db, $empQuery);
while ($r = mysqli_fetch_assoc($empRecords)) {
    $cleaned_tlg_lahir = formatDate($r['tgl_lahir']);
    $cleaned_tlg_masuk = formatDate($r['tgl_masuk']);

    $sql = "UPDATE `employee` SET `tgl_lahir` = '" . $cleaned_tlg_lahir . "', `tgl_masuk` = '" . $cleaned_tlg_masuk . "' WHERE `id` = " . $r['id'];
    if ($db->query($sql)) {
        echo "DONE >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    } else {
        echo "FAILED >> [" . $r['nik'] . "] " . $r['nama'] . "<br/>";
    }
}
