<?php
include "conn.php";
$conn->query('SET NAMES UTF8');
//验证账号不能重复
if(isset($_POST['phone'])){
    $phone=$_POST['phone'];
    $result=$conn->query("select * from user where phone='$phone'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
if(isset($_POST['password'])){
    $password = $_POST['password'];
    $phone=$_POST['phone'];
    echo $phone.$password;
    $conn->query("insert user values(null,'$phone','$password')");
}


