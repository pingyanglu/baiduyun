'use strict';

$(function () {
    var playlist = [];
    var middle = $('.middle');
    render();

    $('.middle').on('click', '.tops', function () {
        var sid = $(this).closest('li').attr('id');
        var index = 0;
        for (var i = 0; i < playlist.length; i++) {
            if (sid == playlist[i].oid) {
                index = i;
            }
        }
        playlist.unshift(playlist.splice(index, 1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();
    });
    function render() {
        if (localStorage.song) {
            playlist = JSON.parse(localStorage.song);
        }
    }
});