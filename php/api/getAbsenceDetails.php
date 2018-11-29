<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

$id = $_GET['id'];

// Get selected ABSENCE details
$sql = "SELECT * FROM `absence` WHERE `id` = " . $id;
$query = $db->query($sql);  
$abs = mysqli_fetch_assoc($query);

echo json_encode($abs);
