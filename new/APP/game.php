<?php
class game{
    function __construct()
    {
        $obj=new db();
        $this->mysql = $obj->mysql;
    }

    function index(){
        include 'APP/views/game.html';
    }
    function select(){
        include 'APP/views/gamelist.html';
    }
    function change(){
        $type = $_GET['type'];
        $pages = $_GET['pages'];
        $offset = ($pages-1)*3;
        $data = $this->mysql->query("select * from game where type = $type limit $offset,3")->fetch_all(1);
        echo json_encode($data);
    }
}