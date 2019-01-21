
$(function(){
    let data = location.search.slice(location.search.indexOf('=')+1)
    let list = localStorage.song ? JSON.parse(localStorage.song ) : [];
    let cont = $('.content')
    let myScroll = new IScroll('.wrapper',{click:true});
    //////////////获取数据////////////////////
    $.ajax({
        url:"/new/index.php/cgmusic/select",
        dataType:"json",
        data:{sid:data},
        success:function(data){
            $('.xinxi>span:first-child').html(data[0].sname)
            $('.xinxi>span:last-child').html(data[0].cname)
            $('.gequ').html(data[0].songnum)
            $('.mv').html(data[0].mv)
            $('.single').html(data[0].single)
            let content = $('.content');
            let gqnum = data[1];
            render(content,gqnum);
        }
    })
    $('.wrapper').on('click','.add',function(){
        let tops = $(this).offset().top;
        let lefts = $(this).offset().left;
        let song = JSON.parse($(this).closest('li').attr('data'));
        if($(this).hasClass('rotate')){
            list = list.filter(ele=> ele.mid != song.mid);
        }else{
            list.push(song);
        }
        localStorage.song = JSON.stringify(list);
        $(this).toggleClass('rotate');
        if($(this).hasClass('rotate')){
        $('<div>').css({width:20,height:20,background:'#ff318e',position:'absolute',top:tops,left:lefts,borderRadius:'50%'}).appendTo(document.body).animate({left:$('header>a:last-child').offset().left,top:$('header>a:last-child').offset().top}).queue(function(){
            $(this).remove();
        })}else{
            $('<div>').css({width:20,height:20,background:'#ff318e',position:'absolute',top:$('header>a:last-child').offset().top,left:$('header>a:last-child').offset().left,borderRadius:'50%'}).appendTo(document.body).animate({left:lefts,top:tops}).queue(function(){
                $(this).remove();
            })
        }
    })
    function render(obj,data){
        obj.empty();
        let str = '';
        let index;
        $.each(data,function(i,v){
            if(i<10){
                index=`0${i+1}`
            }
            str+=`
                <li data='${JSON.stringify(v)}'>
                    <div>
                        <p >
                            <span>${index}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tou">${v.mname}</span>--<span  class="tou">${v.sname}</span></p>
                        <p>${v.mtime}</p>
                    </div>
                    <div class="add"></div>
                </li>
            `
        })
        obj.html(str);
    }
})