<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function random_string($length)
{
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));
    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }
    return $key;
}

function saveBase64ImagePng($name, $base64Image, $imageDir)
{
    //set name of the image file
    $fileName = $name . '.jpg';
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

            $file_name = $rows[0]['nik'] . '-' . random_string(16);

            // delete photo file
            $photoPath = '../../' . $rows[0]['photo_url'];
            if (file_exists($photoPath)) {
                // if it's not default photo placeholder
                if ($photoPath != '../../assets/img/avatar.jpg') {
                    if (unlink($photoPath)) {
                        // then save the new one
                        saveBase64ImagePng($file_name, $photoData, $path);
                    }
                } else {
                    // then save the new one
                    saveBase64ImagePng($file_name, $photoData, $path);
                }
            }

            $sql_sets .= "`" . $value['key'] . "` = 'assets/img/avatars/" . $file_name . ".jpg'";
        } else {
            $sql_sets .= "`" . $value['key'] . "` = '" . $value['value'] . "'";
        }

        // Decide the comma addition to stop!
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
