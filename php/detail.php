<?php
include "conn.php";
$conn->query('SET NAMES UTF8');
if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    $resule=$conn->query("select * from project where sie=$sid");
    echo json_encode($result->fetch_assoc());
}