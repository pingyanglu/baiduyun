<?php
class cgsingermanage{
    public $mysql;
    function __construct(){
        $this->str = '';
        $obj = new db();
        $this->mysql = $obj->mysql;
        /*$this->str = '';
        $this->str1 = $this->cateTree();*/
    }
    function index(){
        $title = '歌曲管理';
        /*header('content-type:text/html;charset=utf8');
        $mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');*/
        $sql="select * from category";
        $result = $this->mysql->query($sql);
        while($row = $result->fetch_assoc()){
                $this->str.="
		                <option value='{$row['cid']}' class='form-control';>{$row['cname']}--{$row['cid']}</option>
		            ";
        }
        $str = $this->str;
        include 'APP/views/cgsingermanage.html';
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
        $this->mysql->query("insert into cgsinger $str");
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
        $mysql = new mysqli('localhost','root','','new',3306);
        $mysql->query('set names utf8');//设置字符集
        $data = $mysql->query("select * from cgsinger")->fetch_all(MYSQL_ASSOC);
        echo json_encode($data);
    }
}