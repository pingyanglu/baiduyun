<?php
class gamemanage{
    function index(){
        $title = '游戏管理';
        include 'APP/views/gamemanage.html';
    }
    function insert(){
        $gname = $_GET['gname'];
        $type = $_GET['type'];
        $mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');//设置字符集
        $mysql->query("insert into game (gname,type) VALUES ('{$gname}'
,$type)");
        if ($mysql->affected_rows){
            echo 'ok';
            exit();
        }
    }
    function show(){
        $mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');//设置字符集
        $data = $mysql->query("select * from game")->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
    function delete(){
        $ids = $_GET['id'];
        $mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');//设置字符集
        $mysql->query("delete from game where gid=$ids");
        if($mysql->affected_rows){
            echo 'ok';
            exit();
        }else{
            echo 'error';
        }
    }
    function change(){
        $pages = $_GET['pages'];
        $offset = ($pages-1)*3;
        $sql = "select * from game limit $offset,3";
        $data= $this->mysql->query($sql)->fetch_all(1);
        echo json_encode($data);
    }
    function update(){
        $type=$_GET['type'];
        $ids=$_GET['id'];
        $value=$_GET['value'];
        $mysql= new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');
        $mysql->query("update game set $type='{$value}' where gid='{$ids}'");
        if($mysql->affected_rows){
            echo 'ok';
            exit();
        }
        echo 'fail';
    }
}