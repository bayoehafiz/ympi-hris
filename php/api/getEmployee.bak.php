<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$sql = "SELECT
            a.*,
            b.nama AS nama_division,
            c.nama AS nama_department,
            d.nama AS nama_section,
            e.nama AS nama_sub_section,
            f.nama AS nama_group,
            g.nama AS nama_grade,
            g.kode AS kode_grade,
            h.nama AS nama_penugasan
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
        GROUP BY a.id";

$query = $db->query($sql);
$rows = array();

// ChromePhp::log($query->num_rows);

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    };

    $data['success'] = true;
    $data['data'] = $rows;
} else {
    $data['success'] = false;
    $data['data'] = '';
}

echo json_encode($data);
