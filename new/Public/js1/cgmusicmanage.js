$(function(){
    if(!location.hash){
        location.herf = location.pathname + '#list';
    }
    let tbody = $('tbody');
    $(window).on('hashchange',function(){
        $('#myTab>li').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $('.tab-content>div').removeClass('active');
        $(location.hash+'-tab').addClass('active');
        if(location.hash=='#list'){
            $.ajax({
                url:'/new/index.php/cgmusicmanage/show',
                dataType:'json',
                success:function(data){
                    render(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
//////////////////////////////////////////////////上传图片
    let thumb = document.querySelector('#thumb');
    let upload = document.querySelector('#image');
    let imgType = ['png','gif','jpeg','jpg'];
    let size = 5 * 1024 * 1024;

    upload.onchange = function () {
        let data = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onload = function (e) {
            thumb.src = e.target.result;
        }
        let formdata=new FormData();
        formdata.append('file',data);
        $.ajax({
            url: '/new/index.php/cgsingermanage/upload',
            method: 'post',
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data) {
                    console.log(data);
                    $(':hidden[name=mimg]')[0].value = data;
                } else if (data == 'error') {
                    alert('fail');
                }
            }
        });
        /*formdata.append('file',data);
        let xml=new XMLHttpRequest();
        xml.open("post","",true);
        xml.send(formdata);
        xml.onload=function(){
            $(':hidden[name=simg]')[0].value+=xml.response;
        }*/
///多文件上传
        /* [...this.files].forEach((element,index)=>{
             let eType = element.type.split('/')[1];
             if(!(element.size<= size && imgType.includes(eType))){
                 alert('请检查你的文件类型和文件的大小');
                 return;
             }
             let reader = new FileReader();
             reader.readAsDataURL(element);
             reader.onload = function(e){
                 let imgs = new Image();
                 imgs.width = 200;
                 imgs.height = 200;
                 imgs.src = e.target.result;
                 let imgBox = document.querySelector('.imgBox');
                 imgBox.appendChild(imgs);
             }
             let data = new FormData();
             data.append('file',element);
             let xml = new XMLHttpRequest();
             xml.open('post','/new/index.php/shopmanage/upload',true);
             xml.send(data);
             xml.onload = function(){
                 // console.log(xml.response)
                 $(':hidden[name=simg]')[0].value += xml.response+',';
             }
         });*/
    }



    ////////////////////////////////////////////////
    let submit = $(':submit');
    submit.on('click',function(){
        /*let data = $('form').serialize();*/
        let data= new FormData($('form')[0]);
        $.ajax({
            url:'/new/index.php/cgmusicmanage/insert',
            data:data,
            //用FormData()这种方式传数据要加以下三条
            method:"post",
            processData:false,
            contentType:false,
            success:function(data){
                console.log(data);
                if(data=='ok'){
                    location.href = location.pathname+'#list';
                }else{
                    alert('fail');
                }
            }
        })
        return false;
    })
    ///////////////////////////////////////
    tbody.on('click','.btn',function(){
        let tr = $(this).closest('tr');
        let ids = tr.attr('id');
        $.ajax({
            url:'/new/index.php/cgsingermanage/delete',
            data:{id:ids},
            success:function(data){
                if(data=='ok'){
                    tr.remove();
                }else if(data=='error'){
                    alert('fail');
                }
            }
        })
    })
///////////////////////////////////////////////
    tbody.on('blur','input',function(e){
        let value=$(this).val();
        let type=$(this).closest('td').attr('type');
        let ids=$(this).closest('tr').attr('id');
        console.log(value,type,ids);
        $.ajax({
            /*url:'/new/index.php/gamemanage/update?'+`value=${value}&type=${type}&id=${ids}`,*/
            url:'/new/index.php/cgsingermanage/update',
            data:{id:ids,value,type},/*???这是什么传值方法*/
            success:function(data){
                console.log(data);
                if(data == 'ok'){
                    location.href =location.pathname+'#list';
                }else if(data =='fail'){
                    alert('未修改');
                }
            }
        })
    })
    ////////////////////////////////////////////////




    /////////////////////购物车////////////////////////////
    function render(data){
        console.log(tbody)
        tbody.html();/*?有啥用 啊这两个*/
        tbody.empty();
        let str = '';
        data.forEach(v=>{
            str+=`
               <tr id='${v['mid']}'>
                    <td type="mid">
                       <input type="text" value="${v['mid']}" disabled="disabled">
                    </td>
                    <td type="mname">                  
                        <input type="text" value="${v['mname']}">
                    </td>
                    <td type="mmp3"> 
                        <input type="text" value="${v['mmp3']}">
                    </td>
                    <td type="mtime"> 
                        <input type="text" value="${v['mtime']}">
                    </td>
                    <td type="mimg"> 
                        <img src="${v['mimg']}" alt="" style="width: 50px;">             
                        <input type="hidden" value="${v['mimg']}">
                    </td>
                    <td type="sname">           
                        <input type="text" value="${v['sname']}">
                    </td>
                    <td type="sid">           
                        <input type="text" value="${v['sid']}">
                    </td>
                    <td>
                        <button class="btn btn-info">删除</button>
                    </td>
               </tr>
            `;
        })
        tbody.html(str);
    }
})