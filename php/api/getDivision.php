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
        if ($table == 'kode_bagian') {
            $searchQuery = " and (a.kode like '%" . $searchValue . "%' or
                            b.nama like '%" . $searchValue . "%' or
                            c.nama like '%" . $searchValue . "%' or
                            d.nama like '%" . $searchValue . "%' or
                            e.nama like '%" . $searchValue . "%' or
                            f.nama like '%" . $searchValue . "%') ";
        } else {
            $searchQuery = " and (a.nama like '%" . $searchValue . "%') ";
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
    if ($table == 'division') {
        $empQuery = "SELECT a.id, a.nama, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `division` a LEFT JOIN `department` b ON a.id = b.parent WHERE 1 {$searchQuery} GROUP BY a.id ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
    } else if ($table == 'department') {
        $empQuery = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `department` a LEFT JOIN `section` b ON a.id  = b.parent LEFT JOIN `division` c ON a.parent = c.id WHERE 1 {$searchQuery} GROUP BY a.id ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
    } else if ($table == 'section') {
        $empQuery = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `section` a LEFT JOIN `sub_section` b ON a.id  = b.parent LEFT JOIN `department` c ON a.parent = c.id WHERE 1 {$searchQuery} GROUP BY a.id ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
    } else if ($table == 'sub_section') {
        $empQuery = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated, IFNULL(COUNT(b.id),0) as child FROM `sub_section` a LEFT JOIN `group` b ON a.id  = b.parent LEFT JOIN `section` c ON a.parent = c.id WHERE 1 {$searchQuery} GROUP BY a.id ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
    } else if ($table == 'group') {
        $empQuery = "SELECT a.id, a.nama, c.nama as parent, a.active, a.created, a.updated FROM `group` a LEFT JOIN `sub_section` c ON a.parent = c.id WHERE 1 {$searchQuery} GROUP BY a.id ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
    } else {
        $empQuery = "SELECT
            a.*,
            b.nama as nama_division,
            c.nama as nama_department,
            d.nama as nama_section,
            e.nama as nama_sub_section,
            f.nama as nama_group
        FROM
            `kode_bagian` a
                LEFT JOIN `division` b ON b.id = a.division
                LEFT JOIN `department` c ON c.id = a.department
                LEFT JOIN `section` d ON d.id = a.section
                LEFT JOIN `sub_section` e ON e.id = a.sub_section
                LEFT JOIN `group` f ON f.id = a.group
        WHERE 1 {$searchQuery}
        GROUP BY a.id
        ORDER BY {$columnName} {$columnSortOrder} LIMIT {$row},{$rowperpage}";
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
