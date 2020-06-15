<?php
include "conn.php";

if (isset($_POST['phone']) && isset($_POST['pass'])) {
    $user = $_POST['phone'];
    $pass = $_POST['pass'];
  
    $result = $conn->query("select * from user where phone='$user' and password='$pass'");
    
    // $insertUser = "insert into user(sid,phone,password) values (null,'$user','$pass')";
    // $query=$conn->query($insertUser);
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}