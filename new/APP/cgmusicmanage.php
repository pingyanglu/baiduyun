<?php
class cgmusicmanage{
    public $mysql;
    function __construct(){
        $this->str = '';
        $obj = new db();
        $this->mysql = $obj->mysql;
    }
    function index(){
        $title = '歌曲管理';
        include "Core/function.php";
        $obj = new unit();
        $str = $obj->cateTree(0,$this->mysql,'category','cgsinger',0);
        include 'APP/views/cgmusicmanage.html';
    }
    /*function cateTree(){
        $sql="select * from 'category'";
        $result = $this->mysql->query($sql);
        while($row = $result->fetch_all(1)){////？？？默认循环
            $this->str.="
		   <option value='{$row['cid']}'> {$row['cname']}</option>";
        }
        return $this->str;
    }*/
    function insert(){
        $data=$_POST;
        //封装的一个关于修改的方法
        $keys=array_keys($data);
        $str='(';
        for($i=0;$i<count($keys);$i++){
            $str.=$keys[$i].',';
        }

        $str=substr($str,0,-1);

        $str.=') values (';
        foreach($data as $v){
            $str.="'{$v}',";
        }
        $str=substr($str,0,-1);
        $str.=')';
        $this->mysql->query("insert into cgmusic $str");
        if($this->mysql->affected_rows>0){
            echo "ok";
        }else{
            echo $str;
        }
    }
    function upload(){
//        $_FILES['file'];
        if(is_uploaded_file($_FILES['file']['tmp_name'])){
            if(!file_exists('Public/upload')){
                mkdir('Public/upload',0777,true);
            }
            $data = date('y-m-d');
            if(!file_exists('Public/upload/'.$data)){
                mkdir('Public/upload/'.$data,0777,true);
            };
            $path = 'Public/upload/'.$data. '/'.$_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'],$path);
            echo '/new/'.$path;

        }
    }
    function show(){
        /*$mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');//设置字符集*/
        $data = $this->mysql->query("select * from cgmusic")->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
}