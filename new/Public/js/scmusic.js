'use strict';

$(function () {
    var playlist = [];
    var mlist = $('.mlist');

    render();

    $('.mlist').on('click', '.tops', function () {
        var sid = $(this).closest('li').attr('id');
        var index = 0;
        for (var i = 0; i < playlist.length; i++) {
            if (playlist[i].mid == sid) {
                index = i;
            }
        }
        playlist.unshift(playlist.splice(index, 1)[0]);
        localStorage.song = JSON.stringify(playlist);
        render();
    });
    $('.mlist').on('click', '.rotate', function () {
        var sid = $(this).closest('li').attr('id');
        playlist = playlist.filter(function (ele) {
            return ele.mid != sid;
        });
        localStorage.song = JSON.stringify(playlist);
        $(this).closest('li').remove();
    });

    function render() {
        if (localStorage.song) {
            playlist = JSON.parse(localStorage.song);
        }
        $('.header .gong').html('\u5171' + playlist.length + '\u9996');
        mlist.empty();
        var str = '';
        playlist.forEach(function (element) {
            str += '\n            <li id="' + element.mid + '">\n            <span>\n                <a href="/new/index.php/play/index?mid=' + element.mid + '">\n                    <img src="../../Public/img/gs-12.png" alt="">\n                </a>                \n            </span>\n            <div>\n                <p>\n                    <a href="/new/index.php/play/index?mid=' + element.mid + '">\n                        <span>' + element.mname + '---' + element.sname + '</span></p>\n                    </a> \n                <p>' + element.mtime + '</p>\n            </div>\n            <div>\n                <span class="rotate"></span>\n                <span class="tops"></span>\n            </div>\n        </li>\n           ';
        });
        mlist.html(str);
    }
});