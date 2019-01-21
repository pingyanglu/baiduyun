<?php
class play{
    public $mysql;
    function __construct(){
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
 function index(){
     include 'APP/views/play.html';
    }
    function select(){
        $sql = "select * from cgmusic";
        $result = $this->mysql->query($sql);
        $data = [];
        while($row = $result->fetch_assoc()){
            array_push($data,$row);
        };
        echo json_encode($data);

    }
}