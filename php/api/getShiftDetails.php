<?php
include "../config/conn.php";
include "../inc/chromePhp.php";

if (isset($_GET['id'])) {
    $sql = "SELECT * FROM `shift` WHERE `id` = " . $_GET['id'];
    $query = $db->query($sql);
    $rec = mysqli_fetch_assoc($query);
    echo json_encode($rec);
}
