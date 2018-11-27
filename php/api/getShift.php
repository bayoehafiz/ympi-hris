<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function getBagianName($db, $table, $id)
{
    $sel = mysqli_query($db, "SELECT nama FROM `" . $table . "` WHERE `id` = " . $id);
    $rec = mysqli_fetch_assoc($sel);
    return $rec['nama'];
}

if (isset($_POST['table'])) {
    $table = $_POST['table'];

    ## Read value
    $draw = $_POST['draw'];
    $row = $_POST['start'];
    $rowperpage = $_POST['length']; // Rows display per page
    $columnIndex = $_POST['order'][0]['column']; // Column index
    $columnName = $_POST['columns'][$columnIndex]['data']; // Column name
    $columnSortOrder = $_POST['order'][0]['dir']; // asc or desc
    $searchValue = $_POST['search']['value']; // Search value

    ## Search
    $searchQuery = " ";
    if ($searchValue != '') {
        if ($table == 'group_shift') {
            $searchQuery = " and (a.`kode` like '%" . $searchValue . "%' or
                                a.`nama` like '%" . $searchValue . "%' or
                                b.`nama` like '%" . $searchValue . "%')";
        } else if ($table == 'shift') {
            $searchQuery = " and (a.`kode` like '%" . $searchValue . "%' or
                                a.`nama` like '%" . $searchValue . "%')";
        } else {
            // $searchQuery = " and (`kode` like '%" . $searchValue . "%' or
            //                     `nama` like '%" . $searchValue . "%' or
            //                     `nama_shift` like '%" . $searchValue . "%')";
        }
    }

    ## Total number of records without filtering
    $sel = mysqli_query($db, "select count(*) as allcount from `" . $table . "` a");
    $records = mysqli_fetch_assoc($sel);
    $totalRecords = $records['allcount'];

    ## Total number of record with filtering
    if ($table == "group_shift") {
        $totQuery = "select count(*) as `allcount` from `" . $table . "` a LEFT JOIN `shift` b ON b.`id` = a.`shift` WHERE 1" . $searchQuery;
    } else {
        $totQuery = "select count(*) as `allcount` from `" . $table . "` a WHERE 1" . $searchQuery;
    }
    $sel = mysqli_query($db, $totQuery);
    $records = mysqli_fetch_assoc($sel);
    $totalRecordwithFilter = $records['allcount'];

    ## Fetch records
    if ($table == "group_shift") {
        $empQuery = "SELECT a.*, b.nama AS nama_shift, b.kode AS kode_shift
                FROM `group_shift` a
                LEFT JOIN `shift` b ON b.`id` = a.`shift`
                WHERE 1 {$searchQuery}
                GROUP BY `id`
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";
    } else {
        $empQuery = "SELECT a.*
                FROM `{$table}` a
                WHERE 1 {$searchQuery}
                GROUP BY a.`id`
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";
    }

    $empRecords = mysqli_query($db, $empQuery);
    $rows = array();

    $counter = 0;
    while ($r = mysqli_fetch_assoc($empRecords)) {
        if ($table == "group_shift") {
            $rows[$counter] = $r;
            $arr = array();
            $av = explode(',', $r['assignation_value']);
            foreach ($av as $value) {
                $dt = getBagianName($db, $r['assignation_key'], $value);
                array_push($arr, $dt);
            }
            $rows[$counter]['assignation_name'] = $arr;
        } else {
            $rows[$counter] = $r;
        }
        $counter++;
    }

    ## Response
    $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecordwithFilter,
        "iTotalDisplayRecords" => $totalRecords,
        "aaData" => $rows,
    );

    echo json_encode($response);
}
