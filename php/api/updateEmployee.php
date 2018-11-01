<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function saveBase64ImagePng($nik, $base64Image, $imageDir)
{
    //set name of the image file
    $fileName = $nik . '.jpg';
    $base64Image = trim($base64Image);
    $base64Image = str_replace('data:image/png;base64,', '', $base64Image);
    $base64Image = str_replace('data:image/jpg;base64,', '', $base64Image);
    $base64Image = str_replace('data:image/jpeg;base64,', '', $base64Image);
    $base64Image = str_replace('data:image/gif;base64,', '', $base64Image);
    $base64Image = str_replace(' ', '+', $base64Image);

    $imageData = base64_decode($base64Image);
    //Set image whole path here
    $filePath = $imageDir . $fileName;
    file_put_contents($filePath, $imageData);
}

if (isset($_POST['data'])) {
    $id = $_POST['id'];
    $data = $_POST['data'];
    $sql_sets = "";
    $arr_length = count($data);
    $counter = 0;
    // Populate the SQL SET data
    foreach ($data as $key => $value) {
        $counter++;

        if ($value['key'] == 'photo_url') {
            // Photo processing
            $photoData = $value['value'];
            $path = '../../assets/img/avatars/';

            // Find the existing file first
            $sql = "SELECT
                nik, photo_url
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
            }

            // delete photo file
            $photoPath = '../../' . $rows[0]['photo_url'];
            if (file_exists($photoPath)) {
                if (unlink($photoPath)) {
                    // then save the new one
                    saveBase64ImagePng($rows[0]['nik'], $photoData, $path);
                }
            }

            $sql_sets .= '`' . $value['key'] . '`';
            $sql_values .= '"assets/img/avatars/' . $rows[0]['nik'] . '.jpg"';
        } else {
            $sql_sets .= '`' . $value['key'] . '`';
            $sql_values .= '"' . $value['value'] . '"';
        }

        $sql_sets .= "`" . $value['key'] . "` = '" . $value['value'] . "'";

        if ($counter != $arr_length) {
            $sql_sets .= ", ";
        }
    }
    $sql = "UPDATE `employee` SET {$sql_sets}  WHERE id = '{$id}'";
    // ChromePhp::log($sql);
    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }
    // //returns data as JSON format
    echo json_encode($res);
}
