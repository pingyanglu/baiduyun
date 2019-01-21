'use strict';

$(function () {
    var mid = location.search.slice(location.search.indexOf('=') + 1);
    var songlist = JSON.parse(localStorage.song);
    var audio = $('#audio');
    var index = 0;
    var lyric = [];
    /////////////////////查找歌曲index/////////////////
    songlist.forEach(function (element, i) {
        if (element.mid == mid) {
            index = i;
        }
    });

    //////////////////处理歌词//////////////
    $.ajax('/new/Public/json/' + songlist[index].mname + '.json', {
        success: function success(data) {
            var result = data.lrc.lyric.split('\n');
            result.forEach(function (element) {
                var time = element.substr(1, 5);
                var ci = element.slice(element.indexOf(']') + 1);
                lyric.push({ time: time, ci: ci });
            });
            render(songlist[index], lyric);
        }
    });
    ////////////////////播放暂停////////////////////////////
    $('.play').on('click', function () {
        if (audio[0].paused) {
            audio[0].play();
            console.log(1);
        } else {
            audio[0].pause();
            console.log(0);
        }
    });

    ///////////////////////歌词同步///////////////////////////////
    var lyrics = $('.lyrics');
    audio[0].ontimeupdate = function () {
        // audio[0].play();
        var ct = timeModel(this.currentTime);
        var dt = timeModel(this.duration);
        var bili = this.currentTime / this.duration;
        $('.ctime').text(ct);
        $('.duration').text(dt);
        $('.mai .select').css('width', bili * 100 + '%');

        lyric.forEach(function (v, i) {
            var a = 0;
            if (v.time == ct) {
                a = i;
                if (i < 3) {
                    i = 0;
                } else {
                    i -= 3;
                }
                var str = '';
                lyrics.empty();
                for (var j = i; j < lyric.length; j++) {
                    str += '<li class="lis' + j + '"> ' + lyric[j]['ci'] + '</li>';
                }
                lyrics.html(str);
                $('.lis' + a).css('color', 'green');
            }
        });
    };
    ///////////////////格式化时间//////////////////////////////
    function timeModel(time) {
        var m = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
        var s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
        return m + ':' + s;
    }

    function render(song, lyric) {
        $('.header p').text(song.mname);
        audio.attr('src', song.mmp3);
        audio[0].play();
        $('.ctime').text('00:00');
        $('.duration').text(song.mtime);
        $('.lyrics').empty();
        var str = '';
        lyric.forEach(function (v, i) {
            str += '\n             <li class="lis' + i + '">' + v.ci + '</li>\n            ';
        });
        $('.lyrics').html(str);
    }
});