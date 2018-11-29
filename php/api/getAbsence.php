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
        $searchQuery = " and (kode like '%" . $searchValue . "%' or
                        jenis like '%" . $searchValue . "%' or
                        nama like '%" . $searchValue . "%')";
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
    $empQuery = "SELECT *
                FROM `{$table}`
                WHERE 1 {$searchQuery}
                GROUP BY id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";

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
