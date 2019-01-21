<?php
class cgmusic{
    public $mysql;
    function __construct(){
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
 function index(){
     include 'APP/views/cgmusic.html';
    }
    function select(){
        $sid = $_REQUEST['sid'];
        $sql = "select category.cname,cgsinger.* from category,cgsinger where category.cid = cgsinger.cid  and  sid=$sid";
        $result = $this->mysql->query($sql)->fetch_assoc();
        $song = $this->mysql->query("select * from cgmusic where sid = $sid")->fetch_all(1);
        $a=[$result,$song];
        echo json_encode($a);
//        var_dump($result);

    }
}