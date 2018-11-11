<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_POST['table'];
$data = array();

if ($table == "kode_bagian") {
    $rows = array();
    $tmp = array();
    $sql = "SELECT id, kode AS nama, bagian_key, bagian_value FROM `kode_bagian` WHERE active = 1 ORDER BY nama";
    $q = mysqli_query($db, $sql);

    if ($q->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($q)) {
            // read the employee total
            $sel = mysqli_query($db, "SELECT count(*) AS total FROM `employee` WHERE active = 1 AND `" . $r['bagian_key'] . "` = " . $r['bagian_value']);
            $rec = mysqli_fetch_assoc($sel);

            $r['total'] = $rec['total'];
            $rows[] = $r;
        }

        // ChromePhp::log($rows);

        $data['success'] = true;
        $data['data'] = $rows;
    } else {
        $data['success'] = false;
        $data['message'] = 'Data kosong!';
    }

} else {
    $rows = array();
    $sql = "SELECT
                a.id, a.nama, COUNT(b.id) AS total
            FROM
                `{$table}` a
                    LEFT JOIN
                `employee` b ON b.{$table} = a.id
            WHERE
                a.active = 1
            GROUP BY a.id
            ORDER BY a.nama";

    $query = $db->query($sql);
    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        }

        // ChromePhp::log($rows);

        $data['success'] = true;
        $data['data'] = $rows;
    } else {
        $data['success'] = false;
        $data['message'] = 'Data kosong!';
    }

}

echo json_encode($data);
