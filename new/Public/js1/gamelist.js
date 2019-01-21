$(function(){
    let main = $('.main');
    let lis = $('.main>li');
    let change = $('.change');
    ///////////////////////////////////////////////
    let type = location.search.slice(-1);
    main.on('click','li',function(){
        if($('.main>li.active').length ==2){
            change.addClass('active');
        }
        $(this).css('transform','rotateY(360deg)');
    });

    main.on('webkitTransitionEnd','li',function(){
        $(this).addClass('active');
    });
    /////////////////////////////////////////////////////////
    let pages = 1;
    $('header').on('click','.change.active',function(){
        pages++;
        $.ajax({
            url:'/new/index.php/game/change',
            dataType:'json',
            data:{pages,type},
            success:function(data){
                render(data);
            }
        })
    });
//////////////////////////////////////////////////////////
    let buttons = $('button');
    buttons.on('click',function(){
        pages=1;
        buttons.removeClass('active');
        $(this).addClass('active');
        type = $(this).prop('id');
        $.ajax({
            url:'/new/index.php/game/change',
            data:{type,pages:1},
            dataType:'json',
            success:function(data){
                render(data);
            }
        })
    });
    $(buttons[0]).triggerHandler('click');
//////////////////////////////////////////////////////
    function render(data){
        main.empty();
        change.removeClass('active');
        data.forEach(v=>{
            $('<li>').html(v.gname).prependTo(main);
        })

    }

});