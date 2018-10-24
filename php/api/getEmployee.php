<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

## Read value
$draw            = $_POST['draw'];
$row             = $_POST['start'];
$rowperpage      = $_POST['length']; // Rows display per page
$columnIndex     = $_POST['order'][0]['column']; // Column index
$columnName      = $_POST['columns'][$columnIndex]['data']; // Column name
$columnSortOrder = $_POST['order'][0]['dir']; // asc or desc
$searchValue     = $_POST['search']['value']; // Search value

## Search 
$searchQuery = " ";
if ($searchValue != '') {
    $searchQuery = " and (a.nama like '%" . $searchValue . "%' or 
        a.nik like '%" . $searchValue . "%' or
        a.status like'%" . $searchValue . "%' ) ";
}

## Total number of records without filtering
$sel          = mysqli_query($db, "select count(*) as allcount from employee");
$records      = mysqli_fetch_assoc($sel);
$totalRecords = $records['allcount'];

## Total number of record with filtering
$sel                   = mysqli_query($db, "select count(*) as allcount from employee WHERE 1 " . $searchQuery);
$records               = mysqli_fetch_assoc($sel);
$totalRecordwithFilter = $records['allcount'];

## Fetch records
$empQuery = "SELECT
            a.*,
            b.nama AS nama_division,
            c.nama AS nama_department,
            d.nama AS nama_section,
            e.nama AS nama_sub_section,
            f.nama AS nama_group,
            g.nama AS nama_grade,
            g.kode AS kode_grade,
            h.nama AS nama_penugasan,
            i.kode AS nama_kode_bagian
        FROM
            employee a
                LEFT JOIN
            division b ON b.id = a.division
                LEFT JOIN
                    department c ON c.id = a.department
                LEFT JOIN
                    section d ON d.id = a.section
                LEFT JOIN
                    sub_section e ON e.id = a.sub_section
                LEFT JOIN
                    `group` f ON f.id = a.group
                LEFT JOIN
                    grade g ON g.id = a.grade
                LEFT JOIN
                    penugasan h ON h.id = a.penugasan 
                LEFT JOIN
                    kode_bagian i ON i.id = a.kode_bagian 
        WHERE 1 {$searchQuery} 
        ORDER BY {$columnName} {$columnSortOrder} 
        LIMIT {$row},{$rowperpage}";

// ChromePhp::log($empQuery);

$empRecords = mysqli_query($db, $empQuery);
$rows       = array();

while ($r = mysqli_fetch_assoc($empRecords)) {
    $rows[] = $r;
}

## Response
$response = array(
    "draw" => intval($draw),
    "iTotalRecords" => $totalRecordwithFilter,
    "iTotalDisplayRecords" => $totalRecords,
    "aaData" => $rows
);

echo json_encode($response);
