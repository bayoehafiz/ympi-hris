<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (!empty($_POST['data'])) {
    $original_nik = $_POST['nik'];
    $data = $_POST['data'];

    $sql_sets = '';
    $arr_length = count($data);
    $counter=0;
    $nik = '';

    // Populate the SQL SET data
    foreach ($data as $key => $value) {
        $counter++;
        
        if ($value['key'] == 'tgl_masuk' || $value['key'] == 'tgl_lahir') {  // manipulate the TGL_MASUK and TGL_LAHIR field
            $date = date('Y-m-d', strtotime(str_replace('-', '/', $value['value'])));
            $sql_sets .= '`' . $value['key'] . '`=' . $date;
        } else {
            $sql_sets .= '`' . $value['key'] . '`="' . $value['value'] . '"';
        }

        if ($counter != $arr_length) $sql_sets .= ', ';
    }

    ChromePhp::log($sql);

    // if($db->query($sql)){
    //     $res['status'] = 'ok';
    // }else{
    //     $res['status'] = 'err';
    //     $res['message'] = '('. $db->errno .') '. $db->error;
    // }

    // //returns data as JSON format
    // echo json_encode($res);
}
