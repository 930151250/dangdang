<?php


//php引入公共文件
require "conn.php";



//接收收据
$sid=$_GET['sid'];
$result = $conn->query("select * from dangdanggoods where sid='{$sid}'");

$taobaoarr = $result->fetch_assoc();

// for ($i = 0; $i < $result->num_rows; $i++) {
//     $taobaoarr[$i] = $result->fetch_assoc();
// }

echo json_encode($taobaoarr);