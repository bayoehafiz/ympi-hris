<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

function findShift($db, $bagian, $value)
{
    $recs = array();
    $query = "SELECT a.`id`, a.`date_from`, a.`date_to`, b.`nama`, b.`hari_efektif`, b.`jam_masuk`, b.`jam_keluar`
            FROM `group_shift` a
            LEFT JOIN `shift` b ON b.`id` = a.`shift`
            WHERE a.`assignation_key` = '" . $bagian . "' 
                AND a.`assignation_value` = " . $value;
                
    $sel = mysqli_query($db, $query);
    while ($r = mysqli_fetch_assoc($sel)) {
        $recs[] = $r;
    }
    return $recs;
}

$sql = "SELECT `division`, `department`, `section`, `sub_section`, `group` FROM `employee` where `id` = " . $_GET['id'];
$query = $db->query($sql);
$data = array();

if ($query->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($query)) {
        // Trace the assigned shift
        if ($r['group'] != null) {
            $data = findShift($db, 'group', $r['group']);
            if ($data == null) {
                $data = findShift($db, 'sub_section', $r['sub_section']);
                if ($data == null) {
                    $data = findShift($db, 'section', $r['section']);
                    if ($data == null) {
                        $data = findShift($db, 'department', $r['department']);
                        if ($data == null) {
                            $data = findShift($db, 'division', $r['division']);
                        }
                    }
                }
            }
        } else {
            if ($r['sub_section'] != null) {
                $data = findShift($db, 'sub_section', $r['sub_section']);
                if ($data == null) {
                    $data = findShift($db, 'section', $r['section']);
                    if ($data == null) {
                        $data = findShift($db, 'department', $r['department']);
                        if ($data == null) {
                            $data = findShift($db, 'division', $r['division']);
                        }
                    }
                }
            } else {
                if ($r['section'] != null) {
                    $data = findShift($db, 'section', $r['section']);
                    if ($data == null) {
                        $data = findShift($db, 'department', $r['department']);
                        if ($data == null) {
                            $data = findShift($db, 'division', $r['division']);
                        }
                    }
                } else {
                    if ($r['department'] != null) {
                        $data = findShift($db, 'department', $r['department']);
                        if ($data == null) {
                            $data = findShift($db, 'division', $r['division']);
                        }
                    } else {
                        $data = findShift($db, 'division', $r['division']);
                    }
                }
            }
        }
    }
}

echo json_encode($data);

