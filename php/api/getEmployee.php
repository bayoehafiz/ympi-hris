<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

## Read value
$draw = $_POST['draw'];
$row = $_POST['start'];
$rowperpage = $_POST['length']; // Rows display per page
$columnIndex = $_POST['order'][0]['column']; // Column index
$columnName = $_POST['columns'][$columnIndex]['data']; // Column name
$columnSortOrder = $_POST['order'][0]['dir']; // asc or desc
$searchValue = $_POST['search']['value']; // Search value
$scope = $_POST['scope']; // active or inactive employees

if ($scope == 'active') {
    $scope = 1;
    $select = "a.`id`,
                a.`nik`,
                a.`nama`,
                a.`status`,
                a.`photo_url`,
                a.`tgl_masuk`,
                -- a.*,
                b.`nama` AS `nama_division`,
                c.`nama` AS `nama_department`,
                d.`nama` AS `nama_section`,
                e.`nama` AS `nama_sub_section`,
                f.`nama` AS `nama_group`,
                g.`nama` AS `nama_grade`,
                g.`kode` AS `kode_grade`,
                h.`nama` AS `nama_penugasan`,
                i.`kode` AS `nama_kode_bagian`";
} else {
    $scope = 0;
    $select = "a.`id`,
                a.`nik`,
                a.`nama`,
                a.`status`,
                a.`photo_url`,
                a.`termination_date`,
                a.`termination_reason`,
                a.`updated`";
}

if (isset($_POST['filter'])) {
    $filterValue = $_POST['filter'];
} else {
    $filterValue = '';
}

## Search
$searchQuery = " ";
if ($searchValue != '') {
    $searchQuery = " and (a.`nama` like '%" . $searchValue . "%' or
        a.`nik` like '%" . $searchValue . "%') ";
}

# Filter
$filterQuery = " ";
if ($filterValue != '') {
    foreach ($filterValue as $value) {
        if ($value['key'] == 'status' || $value['key'] == 'jenis_kelamin') {
            $filterQuery .= " and a.`" . $value['key'] . "` = '" . $value['value'] . "'";
        } else {
            $filterQuery .= " and a.`" . $value['key'] . "` = " . $value['value'];
        }

    }
}

## Total number of record
$sel = mysqli_query($db, "select count(a.`id`) as `allcount` from `employee` a WHERE a.`active` = " . $scope . " " . $filterQuery . $searchQuery);
$records = mysqli_fetch_assoc($sel);
$totalRecord = $records['allcount'];

## Fetch records
$empQuery = "SELECT
            {$select}
        FROM
            `employee` a
                LEFT JOIN
            `division` b ON b.`id` = a.`division`
                LEFT JOIN
                    `department` c ON c.`id` = a.`department`
                LEFT JOIN
                    `section` d ON d.`id` = a.`section`
                LEFT JOIN
                    `sub_section` e ON e.`id` = a.`sub_section`
                LEFT JOIN
                    `group` f ON f.`id` = a.`group`
                LEFT JOIN
                    `grade` g ON g.`id` = a.`grade`
                LEFT JOIN
                    `penugasan` h ON h.`id` = a.`penugasan`
                LEFT JOIN
                    `kode_bagian` i ON i.`id` = a.`kode_bagian`
        WHERE a.`active` = {$scope} {$filterQuery} {$searchQuery}
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
    "iTotalRecords" => $totalRecord,
    "iTotalDisplayRecords" => $totalRecord,
    "aaData" => $rows,
);

echo json_encode($response);
