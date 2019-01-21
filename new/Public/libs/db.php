<?php
	header('content-type:text/html;charset=utf8');
	$mysql = new mysqli('localhost','root','','new',3306);
	$mysql->query('set names utf8');
	if($mysql->connect_errno){
		echo "数据连接失败，失败信息".$mysql->connect_errno;
		exit;
	}
?>