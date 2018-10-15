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
            g.nama AS nama_jabatan,
            h.nama AS nama_grade,
            h.kode AS kode_grade,
            i.nama AS nama_penugasan
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
                    jabatan g ON g.id = a.jabatan
                LEFT JOIN
                    grade h ON h.id = a.grade
                LEFT JOIN
                    penugasan i ON i.id = a.penugasan
        GROUP BY a.id";

$query = $db->query($sql);
$rows = array();

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
