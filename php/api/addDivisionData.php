<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function getParent($db, $targetTbl, $targetId)
{
    $sel = mysqli_query($db, "SELECT parent FROM `" . $targetTbl . "` WHERE `id` = " . $targetId);
    $rec = mysqli_fetch_assoc($sel);
    return $rec['parent'];
}

if (isset($_POST['obj'])) {
    $data = $_POST['obj'];
    $table = $_POST['table'];

    $sql_sets = '';
    $sql_values = '';
    $arr_length = count($data);
    $counter = 0;

    if ($table == 'kode_bagian') {
        // Begin tracing whole Bagian tree !!!
        foreach ($data as $key => $value) {
            if ($value['key'] == 'bagian_key') {
                $rootTable = $value['value'];
            } else if ($value['key'] == 'bagian_value') {
                $rootId = $value['value'];
            } else {
                $code = $value['value'];
            }
        }

        // find the PARENT route
        $parents = array();
        switch ($rootTable) {
            case 'division':
                break;
            case 'department':
                $parents = ["division"];
                break;
            case 'section':
                $parents = ["department", "division"];
                break;
            case 'sub_section':
                $parents = ["section", "department", "division"];
                break;
            default:
                $parents = ["sub_section", "section", "department", "division"];
                break;
        }

        $traceData = array();
        // push root table into array first!
        $traceData[0]['table'] = $rootTable;
        $traceData[0]['id'] = $rootId;

        // if the ROOT TABLE is "division", then stop tracking
        if (sizeOf($parents) > 0) {
            $temp = array(); // <- to save "parent" data information
            $temp[0] = getParent($db, $rootTable, $rootId);
            $c = 0;
            foreach ($parents as $parent) {
                if ($c < sizeOf($parents)) {
                    $traceData[$c + 1]['table'] = $parent;
                    $traceData[$c + 1]['id'] = $temp[$c];
                    if ($parent != 'division') {
                        $temp[$c + 1] = getParent($db, $parent, $temp[$c]);
                    }
                }
                $c++;
            }
        }

        // inject KODE and ROOT TABLE information
        $sql_sets .= '`kode`, ';
        $sql_sets .= '`bagian_key`, ';
        $sql_sets .= '`bagian_value`, ';
        $sql_values .= '"' . $code . '", ';
        $sql_values .= '"' . $rootTable . '", ';
        $sql_values .= intval($rootId) . ', ';

        // Finally, prepare $traceData for DB querying
        foreach ($traceData as $data) {
            $counter++;
            $sql_sets .= '`' . $data['table'] . '`';
            $sql_values .= intval($data['id']);

            if ($counter != sizeof($traceData)) {
                $sql_sets .= ', ';
                $sql_values .= ', ';
            }
        }

    } else {
        foreach ($data as $key => $value) {
            if ($value['value'] != '') {
                $counter++;

                if ($value['key'] == 'nik') {
                    $sql_sets .= '`' . $value['key'] . '`';
                    $sql_values .= intval($value['value']);
                } else {
                    $sql_sets .= '`' . $value['key'] . '`';
                    $sql_values .= '"' . $value['value'] . '"';
                }

                if ($counter != $arr_length) {
                    $sql_sets .= ', ';
                    $sql_values .= ', ';
                }
            }
        }
    }

    $sql = "INSERT INTO `" . $table . "` (" . $sql_sets . ") VALUES (" . $sql_values . ")";

    // ChromePhp::log($sql);

    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }

    //returns data as JSON format
    echo json_encode($res);
}
