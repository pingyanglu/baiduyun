<?php
class cgsinger{
    public $mysql;
    function __construct(){
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
 function index(){
     include 'APP/views/cgsinger.html';
    }
    function select(){
        $cid= $_REQUEST['cid'];
        $sql = "select * from cgsinger where cid=$cid";
        $result = $this->mysql->query($sql);
        $data = [];
        while($row = $result->fetch_assoc()){
            array_push($data,$row);
        };
        echo json_encode($data);

    }
}