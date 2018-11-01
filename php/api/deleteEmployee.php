<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "SELECT
                photo_url
            FROM
                employee
            WHERE id = '{$id}'
            LIMIT 1";

    $query = $db->query($sql);
    $rows = array();

    if ($query->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($query)) {
            $rows[] = $r;
        }

        // delete photo file
        $photoPath = '../../' . $rows[0]['photo_url'];
        if (file_exists($photoPath)) {
            if (!unlink($photoPath)) {
                echo ("Error deleting photo file");
            }
        }

        // then remove data from DB
        $sql = "DELETE FROM employee WHERE id = '" . $id . "'";

        if ($db->query($sql)) {
            $res['success'] = true;
            $res['message'] = 'Data berhasil dihapus';
        } else {
            $res['success'] = false;
            $res['message'] = '(' . $db->errno . ') ' . $db->error;
        }
    } else {
        $res['success'] = false;
        $res['data'] = 'Gagal menemukan data pegawai!';
    }

    //returns data as JSON format
    echo json_encode($res);
}
