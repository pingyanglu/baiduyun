$(function(){
    let playlist = [];
    let middle = $('.middle');
    render();

    $('.middle').on('click','.tops',function(){
        let sid = $(this).closest('li').attr('id');
        let index = 0;
        for(let i=0;i<playlist.length;i++){
            if(sid==playlist[i].oid){
                index=i;
            }
        }
        playlist.unshift(playlist.splice(index,1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();

    })
    function render() {
        if(localStorage.song){
            playlist = JSON.parse(localStorage.song);
        }
    }

})