<?php
class unit{
    function __construct()
    {
        $this->str='';
        $this->parentid = null;
    }
    function cateTree($id,$mysql,$table1,$table2,$flag){
        $flag++;
        $sql="select * from $table1 where pid = $id";
        $result = $mysql->query($sql);
        while($row = $result->fetch_array()){
            $heng = str_repeat('-',$flag);
            $this->str.="
		                <option value='{$row[1]}'>{$heng} {$row[1]}---{$row[0]}</option>
		            ";
            $this->cateTree($row['cid'],$mysql,$table2,$table1,$flag);
        }
        return $this->str;
    }
}