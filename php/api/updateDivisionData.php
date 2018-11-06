<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function getParent($db, $targetTbl, $targetId)
{
    $sel = mysqli_query($db, "SELECT parent FROM `" . $targetTbl . "` WHERE `id` = " . $targetId);
    $rec = mysqli_fetch_assoc($sel);
    return $rec['parent'];
}

if (isset($_POST['data'])) {
    $id = $_POST['id'];
    $data = $_POST['data'];
    $table = $_POST['table'];

    $sql_sets = "";
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
        $sql_sets .= '`kode` = "' . $code . '", `bagian_key` = "' . $rootTable . '", `bagian_value` = ' . intval($rootId) . ', ';

        // Finally, prepare $traceData for DB querying
        foreach ($traceData as $data) {
            $counter++;
            $sql_sets .= '`' . $data['table'] . '` = ' . intval($data['id']);

            if ($counter != sizeof($traceData)) {
                $sql_sets .= ', ';
            }
        }

    } else {

        // Populate the SQL SET data
        foreach ($data as $key => $value) {
            $counter++;
            $sql_sets .= "`" . $value['key'] . "` = '" . $value['value'] . "'";
            if ($counter != $arr_length) {
                $sql_sets .= ", ";
            }
        }
    }

    $sql = "UPDATE `{$table}` SET {$sql_sets}  WHERE id = '{$id}'";

    ChromePhp::log($sql);

    if ($db->query($sql)) {
        $res['success'] = true;
    } else {
        $res['success'] = false;
        $res['message'] = '(' . $db->errno . ') ' . $db->error;
    }

    // //returns data as JSON format
    echo json_encode($res);
}
