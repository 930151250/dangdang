<?php
include "conn.php";

if (isset($_POST['submit'])) {
    $user = $_POST['phone'];
    $pass = $_POST['password'];
  
    // $result = $conn->query("select * from user where phone='$user'");
    // var_dump($result);
    
    $insertUser = "insert into user(sid,phone,password) values (null,'$user','$pass')";
    $query=$conn->query($insertUser);
    if ($query) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}
