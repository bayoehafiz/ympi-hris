<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$oldShift = $_GET['o'];
$employee = $_GET['e'];

// Function to check if old shift is OVERRIDING SHIFT
function isOverriding($db, $id)
{
    $sql = "SELECT `override` FROM `shift` WHERE `id` = " . $id;
    $query = $db->query($sql);
    $rec = mysqli_fetch_assoc($query);
    if ($rec['override'] == '1') {
        return true;
    } else {
        return false;
    }
}

// Function to fetch the overriding shifts
function findOverrideShift($db, $unit, $id, $old_shift)
{
    $recs = array();
    $sql = "SELECT `shift`
        FROM `group_shift`
        WHERE `assignation_key` = '" . $unit . "'
            AND find_in_set(" . $id . ", `assignation_value`)";

    $query = $db->query($sql);
    while ($r = mysqli_fetch_assoc($query)) {
        $sql2 = "SELECT `id` FROM `shift` WHERE find_in_set(" . $r['shift'] . ", `override_shift`) AND `id` <> " . $old_shift;
        $query2 = $db->query($sql2);
        while ($r2 = mysqli_fetch_assoc($query2)) {
            $recs[] = $r2['id'];
        }
    }
    return $recs;
}

// Function to fetch the shifts
function findShift($db, $unit, $id, $old_shift)
{
    $recs = array();
    $sql = "SELECT `shift`
        FROM `group_shift`
        WHERE `assignation_key` = '" . $unit . "'
            AND find_in_set(" . $id . ", `assignation_value`)
            AND `shift` <> " . $old_shift;

    $query = $db->query($sql);
    while ($r = mysqli_fetch_assoc($query)) {
        $recs[] = $r['shift'];
    }
    return $recs;
}

// search query
$where = "";
if (isset($_GET['q'])) {
    $searchValue = $_GET['q'];
    $where = " AND (`nama` like '%" . $searchValue . "%' or `kode` like '%" . $searchValue . "%')";
}

// search SHIFTs that only suited for the employee (by tracing shift plots!)
$foundShift = array();
$sql = "SELECT `id`,
        `division`,
        `department`,
        `section`,
        `sub_section`,
        `group`
    FROM
        `employee`
    WHERE `id` = " . $employee;
$query = $db->query($sql);
$emp = mysqli_fetch_assoc($query);

if ($emp['group'] != null) {
    if (isOverriding($db, $oldShift) == 1) {
        $res = findOverrideShift($db, 'group', $emp['group'], $oldShift);
    } else {
        $res = findShift($db, 'group', $emp['group'], $oldShift);
    }
    if (count($res) > 0) {
        array_push($foundShift, $res);
    }
}
if ($emp['sub_section'] != null) {
    if (isOverriding($db, $oldShift) == 1) {
        $res = findOverrideShift($db, 'sub_section', $emp['sub_section'], $oldShift);
    } else {
        $res = findShift($db, 'sub_section', $emp['sub_section'], $oldShift);
    }
    if (count($res) > 0) {
        array_push($foundShift, $res);
    }
}
if ($emp['section'] != null) {
    if (isOverriding($db, $oldShift) == 1) {
        $res = findOverrideShift($db, 'section', $emp['section'], $oldShift);
    } else {
        $res = findShift($db, 'section', $emp['section'], $oldShift);
    }
    if (count($res) > 0) {
        array_push($foundShift, $res);
    }
}
if ($emp['department'] != null) {
    if (isOverriding($db, $oldShift) == 1) {
        $res = findOverrideShift($db, 'department', $emp['department'], $oldShift);
    } else {
        $res = findShift($db, 'department', $emp['department'], $oldShift);
    }
    if (count($res) > 0) {
        array_push($foundShift, $res);
    }
}
if (isOverriding($db, $oldShift) == 1) {
    $res = findOverrideShift($db, 'division', $emp['division'], $oldShift);
} else {
    $res = findShift($db, 'division', $emp['division'], $oldShift);
}
if (count($res) > 0) {
    array_push($foundShift, $res);
}

// compile all available shifts & remove duplicates
$finalShift = array();
foreach ($foundShift as $shift) {
    foreach ($shift as $dt) {
        if (!isset($finalShift[$dt])) {
            $finalShift[$dt] = $dt;
        }
    }
}
$finalShift = implode(",", $finalShift);

// main query
if ($oldShift == '0') { // extra freeday shift
    $sql = "SELECT `id`, `kode`, `nama` AS `text`
        FROM `shift`
        WHERE (`active` = 1
        AND `id` IN (" . $finalShift . ")" . $where . ") OR `on_freeday` = '1' ORDER BY `nama`";
} else {
    $sql = "SELECT `id`, `kode`, `nama` AS `text`
        FROM `shift`
        WHERE `active` = 1
        AND `id` IN (" . $finalShift . ")" . $where . " ORDER BY `nama`";
}

// paging
if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $resultCount = 10;
    $end = ($page - 1) * $resultCount;
    $start = $end + $resultCount;
    $sql .= " LIMIT " . $end . ", " . $start;
}

$query = $db->query($sql);
$rows = array();

$count = $query->num_rows;

if ($query->num_rows > 0) {
    $counter = 0;
    while ($r = mysqli_fetch_assoc($query)) {
        $rows[$counter] = $r;
        $rows[$counter]['total_count'] = $count;
        $counter++;
    }
}

echo json_encode($rows);
