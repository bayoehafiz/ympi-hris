<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function findOverrode($db, $id)
{
    $recs = array();
    $query = "SELECT *
            FROM `shift`
            WHERE `override` = 1 
                AND find_in_set(" . $id . ", `override_shift`) 
                AND `active` = 1";

    $sel = mysqli_query($db, $query);
    while ($r = mysqli_fetch_assoc($sel)) {
        $recs[] = $r;
    }
    return $recs;
}

function findShift($db, $bagian, $value)
{
    $recs = array();
    $query = "SELECT a.*,
                b.`kode` AS `kode_shift`,
                b.`nama` AS `nama_shift`,
                b.`hari_efektif`,
                b.`jam_masuk`,
                b.`jam_keluar`,
                b.`override`,
                b.`override_shift`
            FROM `group_shift` a
                LEFT JOIN `shift` b ON b.`id` = a.`shift`
            WHERE a.`assignation_key` = '" . $bagian . "' 
                AND find_in_set(" . $value . ", a.`assignation_value`)
                AND a.`active` = 1";

    $sel = mysqli_query($db, $query);
    while ($r = mysqli_fetch_assoc($sel)) {
        $r['overrode_by'] = findOverrode($db, $r['shift']);
        $recs[] = $r;
    }
    return $recs;
}

$sql = "SELECT a.`id`,
        a.`nik`,
        a.`nama`,
        a.`division`,
        a.`department`,
        a.`section`,
        a.`sub_section`,
        a.`group`,
        b.`nama` AS `nama_division`,
        IFNULL(c.`nama`, '-') AS `nama_department`,
        IFNULL(d.`nama`, '-') AS `nama_section`,
        IFNULL(e.`nama`, '-') AS `nama_sub_section`,
        IFNULL(f.`nama`, '-') AS `nama_group`,
        IFNULL(g.`kode`, '-') AS `nama_kode_bagian`,
        h.`nama` AS `nama_grade`,
        h.`kode` AS `kode_grade`,
        IFNULL(i.`nama`, '-') AS `nama_penugasan`
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
        `kode_bagian` g ON g.`id` = a.`kode_bagian`
            LEFT JOIN
        `grade` h ON h.`id` = a.`grade`
            LEFT JOIN
        `penugasan` i ON i.`id` = a.`penugasan`
    WHERE a.`id` = " . $_GET['id'];

$query = $db->query($sql);
$data = array();
$shift = array();
// $found = 0;

if ($query->num_rows > 0) {
    $r = mysqli_fetch_assoc($query);
    $data['employee'] = $r;

    // check if there's any SHIFT PLOT assigned by_employee
    $shift['by_employee'] = findShift($db, 'employee', $r['id']);

    // Get all related shifts
    if ($r['group'] != null) {
        $shift['by_group'] = findShift($db, 'group', $r['group']);
    }
    if ($r['sub_section'] != null) {
        $shift['by_sub_section'] = findShift($db, 'sub_section', $r['sub_section']);
    }
    if ($r['section'] != null) {
        $shift['by_section'] = findShift($db, 'section', $r['section']);
    }
    if ($r['department'] != null) {
        $shift['by_department'] = findShift($db, 'department', $r['department']);
    }
    $shift['by_division'] = findShift($db, 'division', $r['division']);
    $data['shift'] = $shift;
}

echo json_encode($data);
