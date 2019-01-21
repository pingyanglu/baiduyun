<?php
    class unit{
		function __construct()
        {
            $this->str='';
            $this->parentid = null;
        }
        /*function cateTree($pid,$db,$table,$flag){
		    $flag++;
            $sql="select * from $table where pid='{$pid}'";
		    $result = $db->query($sql);
		    while($row = $result->fetch_assoc()){

                    $this->str.="
		                <option value='{$row['cid']}' >{$row['cname']}</option>
		            ";
                $this->cateTree($row['cid'],$db,$table,$flag);
            }
            return $this->str;
        }*/
        function cateTree($pid,$db,$table){
            $sql="select * from $table where pid={$pid}";
            $result = $db->query($sql);
            while($row = $result->fetch_assoc()){
                if($row['cid'] == $this->parentid){
                    $this->str.="
		                <option value='{$row['cid']}' selected>{$row['cname']}</option>
		            ";
                }else{
                    $this->str.="
		                <option value='{$row['cid']}'> {$row['cname']}</option>
		            ";
                }
            }
            return $this->str;
        }
        function cateTale($db,$table){
            $sql = "select * from $table ";
            $data = $db->query($sql)->fetch_all(MYSQL_ASSOC);
            for($i=0;$i<count($data);$i++){
                $this->str.="
                <tr>
                    <td>{$data[$i]['cid']}</td>
                    <td>{$data[$i]['cname']}</td>
                    <td>{$data[$i]['pid']}</td>
                    <td>
                        <a href=\"deleteCategory.php?cid={$data[$i]['cid']}\" class=\"btn\">删除</a>
                        <a href=\"updateCategory.php?cid={$data[$i]['cid']}\" class=\"btn\">修改</a>
                    </td>
                </tr>
                ";
            }
            return $this->str;
        }
        function selectOne($db,$table,$id,$attr){
            $sql = "select $attr from $table where cid =$id";
            $data = $db ->query($sql)->fetch_assoc();
            $cname = $data[$attr];
            return $cname;
        }

}
