<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$id = $_GET['id'];
$sql = "SELECT a.*, 
            (SELECT `nama` FROM `division` WHERE `id` = a.`division`) AS division_name,
            (SELECT `nama` FROM `department` WHERE `id` = a.`department`) AS department_name,
            (SELECT `nama` FROM `section` WHERE `id` = a.`section`) AS section_name,
            (SELECT `nama` FROM `sub_section` WHERE `id` = a.`sub_section`) AS sub_section_name,
            (SELECT `nama` FROM `group` WHERE `id` = a.`group`) AS group_name
        FROM `kode_bagian` a
        WHERE a.`id` = " . $id;
$query = $db->query($sql);
$rec = mysqli_fetch_assoc($query);
echo json_encode($rec);