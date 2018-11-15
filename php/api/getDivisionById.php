<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$table = $_GET['table'];
$id = $_GET['id'];

$sql = "SELECT * FROM `{$table}` WHERE `id` = " . $id;
$query = $db->query($sql);
$row = array();
$row = mysqli_fetch_assoc($query);

//returns data as JSON format
echo json_encode($row);
