<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

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
            $searchQuery = " and (a.kode like '%" . $searchValue . "%' or
                                a.nama like '%" . $searchValue . "%' or
                                b.nama like '%" . $searchValue . "%')";
        } elseif ($table == 'shift') {
            $searchQuery = " and (kode like '%" . $searchValue . "%' or
                                nama like '%" . $searchValue . "%' or
                                hari_efektif like '%" . $searchValue . "%')";
        } else {
            $searchQuery = " and (kode like '%" . $searchValue . "%' or
                                nama like '%" . $searchValue . "%' or
                                nama_shift like '%" . $searchValue . "%')";
        }
    }

    ## Total number of records without filtering
    $sel = mysqli_query($db, "select count(*) as allcount from `{$table}`");
    $records = mysqli_fetch_assoc($sel);
    $totalRecords = $records['allcount'];

    ## Total number of record with filtering
    $sel = mysqli_query($db, "select count(*) as allcount from `{$table}` WHERE 1 " . $searchQuery);
    $records = mysqli_fetch_assoc($sel);
    $totalRecordwithFilter = $records['allcount'];

    ## Fetch records
    if ($table == "presence") {
        $empQuery = "SELECT a.*, b.nama AS nama_shift
                FROM `group_shift` a
                LEFT JOIN `shift` b ON b.id = a.shift
                WHERE 1 {$searchQuery}
                GROUP BY id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";
    } else {
        // $empQuery = "SELECT *
        //         FROM `{$table}`
        //         WHERE 1 {$searchQuery}
        //         GROUP BY id
        //         ORDER BY {$columnName} {$columnSortOrder}
        //         LIMIT {$row},{$rowperpage}";
    }

    // ChromePhp::log($empQuery);

    $empRecords = mysqli_query($db, $empQuery);
    $rows = array();

    while ($r = mysqli_fetch_assoc($empRecords)) {
        $rows[] = $r;
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
