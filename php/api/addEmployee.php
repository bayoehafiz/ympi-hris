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
    $data = $_POST['data'];
    $path = '../../assets/img/avatars/';
    $sql_sets = '';
    $sql_values = '';
    $arr_length = count($data);
    $counter = 0;

    if (isset($_POST['new_nik'])) $nik = $_POST['new_nik'];

    foreach ($data as $key => $value) {
        if ($value['value'] != '') {
            $counter++;

            if ($value['key'] == 'photo_url') {
                // Photo processing
                $photoData = $value['value'];
                
                saveBase64ImagePng($nik, $photoData, $path);

                $sql_sets .= '`' . $value['key'] . '`';
                $sql_values .= '"assets/img/avatars/' . $nik . '.jpg"';
            } else {
                $sql_sets .= '`' . $value['key'] . '`';
                $sql_values .= '"' . $value['value'] . '"';
            }

            // Remove comma [,] from last value of the array
            if ($counter != $arr_length) {
                $sql_sets .= ', ';
                $sql_values .= ', ';
            }
        }
    }

    $sql = "INSERT INTO `employee` (" . $sql_sets . ") VALUES (" . $sql_values . ")";
    // chromePhp::log($sql);

    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
