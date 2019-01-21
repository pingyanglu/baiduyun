<?php
class shop{
    public $mysql;
    function __construct(){
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        include 'APP/views/shop.html';
    }
    function delete(){
        echo 'delete';
    }
    /*guolaokai*/
    function select(){
        $sql = "select * from shop ";
        $result = $this->mysql->query($sql);
        $data = [];
         while($row = $result->fetch_assoc()){
            array_push($data,$row);
        };
        echo json_encode($data);

    }
    function shopSure(){
        include 'APP/views/shopSure.html';
    }
    function submit(){
        $order = $_GET['order'];
        $orderObj = json_decode($order);
        $sql = "insert into orders (user,status)  values ('张三',0)";

        /*$this->mysql->autocommit(false);*/

        $this->mysql->query($sql);
        if($this->mysql->affected_rows>0){
//            $this->mysql->commit();
            echo 'ok';
        }else{
//            $this->mysql->rollback();
            echo 'error';
        }
        /*$oid =  $this->mysql->insert_id;

        $str = '';
        for($i=0;$i<count($orderObj);$i++){
            $str.='(';
            foreach($orderObj[$i] as $v){
                $str.=$v.',';
            }
            $str.=$oid.'),';
        }
        $str = substr($str,0,-1);
        $sql = "insert into orderextra (`sid`,`count`,`total`,`oid`) values $str";
        $this->mysql->query($sql);

        if($this->mysql->affected_rows){
            $this->mysql->commit();
            echo 'ok';
        }else{
            $this->mysql->rollback();
            echo 'error';
        }*/
    }
}
/*
 * 分类管理    cid      cname  cimg
 * 歌手管理    sid      sname  simg   songnum   cid
 * 歌单管理    lid      lname   ltime  limg  sid
 * */

