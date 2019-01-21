<?php
class db{
    public $mysql;/*public 都可以访问  定义一个属性*/
    function __construct()
    {
        $this->config();
    }

    function config(){
        header('content-type:text/html;charset=utf8');
        $this->mysql = new mysqli('sqld.duapp.com','507477e91d0546888f375eba2663cc15','4d9c337504b34a1a989214723042af1f','oKsZHzWiNZJthLrVvNKe','4050');
        $this->mysql->query('set names utf8');
        if($this->mysql->connect_errno){
            echo "数据连接失败，失败信息".$this->mysql->connect_errno;
            exit;
        }
    }

}
