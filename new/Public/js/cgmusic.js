'use strict';

$(function () {
    var data = location.search.slice(location.search.indexOf('=') + 1);
    var list = localStorage.song ? JSON.parse(localStorage.song) : [];
    var cont = $('.content');
    var myScroll = new IScroll('.wrapper');
    //////////////获取数据////////////////////
    $.ajax({
        url: "/new/index.php/cgmusic/select",
        dataType: "json",
        data: { sid: data },
        success: function success(data) {
            $('.xinxi>span:first-child').html(data[0].sname);
            $('.xinxi>span:last-child').html(data[0].cname);
            $('.gequ').html(data[0].songnum);
            $('.mv').html(data[0].mv);
            $('.single').html(data[0].single);
            var content = $('.content');
            var gqnum = data[1];
            render(content, gqnum);
        }
    });
    $('.wrapper').on('click', '.add', function () {
        var tops = $(this).offset().top;
        var lefts = $(this).offset().left;
        var song = JSON.parse($(this).closest('li').attr('data'));
        if ($(this).hasClass('rotate')) {
            list = list.filter(function (ele) {
                return ele.mid != song.mid;
            });
        } else {
            list.push(song);
        }
        localStorage.song = JSON.stringify(list);
        $(this).toggleClass('rotate');
        if ($(this).hasClass('rotate')) {
            $('<div>').css({ width: 20, height: 20, background: '#ff318e', position: 'absolute', top: tops, left: lefts, borderRadius: '50%' }).appendTo(document.body).animate({ left: $('header>a:last-child').offset().left, top: $('header>a:last-child').offset().top }).queue(function () {
                $(this).remove();
            });
        } else {
            $('<div>').css({ width: 20, height: 20, background: '#ff318e', position: 'absolute', top: $('header>a:last-child').offset().top, left: $('header>a:last-child').offset().left, borderRadius: '50%' }).appendTo(document.body).animate({ left: lefts, top: tops }).queue(function () {
                $(this).remove();
            });
        }
    });
    function render(obj, data) {
        obj.empty();
        var str = '';
        var index = void 0;
        $.each(data, function (i, v) {
            if (i < 10) {
                index = '0' + (i + 1);
            }
            str += '\n                <li data=\'' + JSON.stringify(v) + '\'>\n                    <div>\n                        <p >\n                            <span>' + index + '</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tou">' + v.mname + '</span>--<span  class="tou">' + v.sname + '</span></p>\n                        <p>' + v.mtime + '</p>\n                    </div>\n                    <div class="add"></div>\n                </li>\n            ';
        });
        obj.html(str);
    }
});