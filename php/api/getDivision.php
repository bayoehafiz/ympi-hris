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
    $totalRecordQuery = " ";
    if ($searchValue != '') {
        if ($table == 'kode_bagian') {
            $searchQuery = " and (a.kode like '%" . $searchValue . "%') ";
        } else {
            $searchQuery = " and (a.nama like '%" . $searchValue . "%') ";
        }
    }

    ## Total number of record
    $totalRecordQuery = "select count(*) as allcount from `{$table}` a WHERE 1" . $searchQuery;
    $sel = mysqli_query($db, $totalRecordQuery);
    $records = mysqli_fetch_assoc($sel);
    $totalRecord = $records['allcount'];

    // ChromePhp::log($totalRecordQuery);

    ## Fetch records
    if ($table == 'kode_bagian') {
        // kode_bagian table
        $empQuery = "SELECT a.*
                FROM `kode_bagian` a
                WHERE 1 {$searchQuery}
                GROUP BY a.id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";

    } else if ($table == 'division') {
        $empQuery = "SELECT a.*, IFNULL(COUNT(b.id),0) AS child
                FROM `division` a
                LEFT JOIN `department` b ON a.id = b.parent
                WHERE 1 {$searchQuery}
                GROUP BY a.id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";

    } else if ($table == 'group') {
        $empQuery = "SELECT a.*, c.nama AS parent_name
                FROM `group` a
                LEFT JOIN `sub_section` c ON a.parent = c.id
                WHERE 1 {$searchQuery}
                GROUP BY a.id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";

    } else {
        if ($table == 'department') {
            $parent = 'division';
            $child = 'section';
        } else if ($table == 'section') {
            $parent = 'department';
            $child = 'sub_section';
        } else {
            $parent = 'section';
            $child = 'group';
        }

        $empQuery = "SELECT a.*, c.nama AS parent_name, IFNULL(COUNT(b.id),0) as child
                FROM `{$table}` a
                LEFT JOIN `{$child}` b ON b.parent = a.id
                LEFT JOIN `{$parent}` c ON a.parent = c.id
                WHERE 1 {$searchQuery}
                GROUP BY a.id
                ORDER BY {$columnName} {$columnSortOrder}
                LIMIT {$row},{$rowperpage}";
    }

    $empRecords = mysqli_query($db, $empQuery);
    $rows = array();

    if ($table == 'kode_bagian') {
        while ($r = mysqli_fetch_assoc($empRecords)) {
            // Get the name og bagian_value
            $initSql = "SELECT `nama` FROM `" . $r['bagian_key'] . "` WHERE `id` = " . $r['bagian_value'];
            $sel = mysqli_query($db, $initSql);
            while ($dt = mysqli_fetch_assoc($sel)) {
                $r['nama_bagian'] = $dt['nama'];
            }
            $rows[] = $r;
        }
    } else {
        while ($r = mysqli_fetch_assoc($empRecords)) {
            $rows[] = $r;
        }
    }

    // ChromePhp::log($rows);

    ## Response
    $response = array(
        "draw" => intval($draw),
        "iTotalRecords" => $totalRecord,
        "iTotalDisplayRecords" => $totalRecord,
        "aaData" => $rows,
    );

    echo json_encode($response);
}
