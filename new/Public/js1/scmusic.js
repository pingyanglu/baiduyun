$(function(){
    let playlist = [];
    let mlist = $('.mlist');


    render();

    $('.mlist').on('click','.tops',function(){
        let sid = $(this).closest('li').attr('id');
        let index = 0;
        for(let i=0;i<playlist.length;i++){
            if(playlist[i].mid == sid){
                index = i;
            }
        }
        playlist.unshift(playlist.splice(index,1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();
    });
    $('.mlist').on('click','.rotate',function(){
        let sid = $(this).closest('li').attr('id');
        playlist = playlist.filter(ele=> ele.mid != sid);
        localStorage.song = JSON.stringify(playlist);
        $(this).closest('li').remove();
    });

    function render(){
        if(localStorage.song){
            playlist = JSON.parse(localStorage.song);
        }
        $('.header .gong').html(`共${playlist.length}首`);
        mlist.empty();
        let str = '';
        playlist.forEach(element=>{
            str +=`
            <li id="${element.mid}">
            <span>
                <a href="/new/index.php/play/index?mid=${element.mid}">
                    <img src="../../Public/img/gs-12.png" alt="">
                </a>                
            </span>
            <div>
                <p>
                    <a href="/new/index.php/play/index?mid=${element.mid}">
                        <span>${element.mname}---${element.sname}</span></p>
                    </a> 
                <p>${element.mtime}</p>
            </div>
            <div>
                <span class="rotate"></span>
                <span class="tops"></span>
            </div>
        </li>
           `;
        })
        mlist.html(str);
    }
})