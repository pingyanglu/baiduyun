<?php
class router{
    static function run(){
//        var_dump($_SERVER['PATH_INFO']);
        if(!isset($_SERVER['PATH_INFO'])||$_SERVER['PATH_INFO']=='/'){
            $model = 'home';
            $fn = 'index';
        }else{
            $pathinfo = explode('/',substr($_SERVER['PATH_INFO'],1));
            $model = $pathinfo[0];
            $fn = isset($pathinfo[1])?$pathinfo[1]:'index';
            echo $model,'---',$fn,'---',"APP/{$model}.php",'---','App/'.$model.'.php';
        }
        if(file_exists("APP/{$model}.php")){
            include 'APP/'.$model.'.php';
            if(class_exists($model)){
                $page = new $model();
                if(method_exists($page,$fn)){
                        $page->$fn();
                    }else{
                        include "APP/views/404.html";
                    }
            }else{
                include "APP/views/404.html";
            }
        }else{
            include "APP/views/404.html";
        }
    }
}