let data = new FormData($('form')[0]);
$(function(){
    if(!location.hash){
        // location.hash = '#add';
        location.herf = location.pathname + '#list';
    }
    let tbody = $('tbody');
    $(window).on('hashchange',function(){
        $('#myTab>li').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $('.tab-content div').removeClass('active');
        $(location.hash+'-tab').addClass('active');
        if(location.hash=='#list'){
            $.ajax({
                url:'/new/index.php/gamemanage/show',
                dataType:'json',
                success:function(data){
                     render(data);
                }
            })
        }
    })
    $(window).triggerHandler('hashchange');
    ////////////////////////////////////////////////
    let submit = $(':submit');
    submit.on('click',function(){
        let data = $('form').serialize();
        console.log(data);
        $.ajax({
            url:'/new/index.php/gamemanage/insert?'+data,
        success:function(data){
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
            url:'/new/index.php/gamemanage/delete',
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
            url:'/new/index.php/gamemanage/update',
            data:{id:ids,value,type},
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
    function render(data){
        tbody.html();/*?有啥用 啊这两个*/
        tbody.empty();
        let str = '';
        data.forEach(v=>{
            str+=`
               <tr id='${v.gid}'>
                    <td type="gid">
                       <input type="text" value="${v['gid']}" disabled="disabled">
                    </td>
                    <td type="gname">                  
                        <input type="text" value="${v['gname']}">
                    </td>
                    <td type="type">
                        <input type="text" value="${v['type']}">
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