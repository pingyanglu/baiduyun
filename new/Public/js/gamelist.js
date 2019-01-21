'use strict';

$(function () {
    var main = $('.main');
    var lis = $('.main>li');
    var change = $('.change');
    ///////////////////////////////////////////////
    var type = location.search.slice(-1);
    main.on('click', 'li', function () {
        if ($('.main>li.active').length == 2) {
            change.addClass('active');
        }
        $(this).css('transform', 'rotateY(360deg)');
    });

    main.on('webkitTransitionEnd', 'li', function () {
        $(this).addClass('active');
    });
    /////////////////////////////////////////////////////////
    var pages = 1;
    $('header').on('click', '.change.active', function () {
        pages++;
        $.ajax({
            url: '/new/index.php/game/change',
            dataType: 'json',
            data: { pages: pages, type: type },
            success: function success(data) {
                render(data);
            }
        });
    });
    //////////////////////////////////////////////////////////
    var buttons = $('button');
    buttons.on('click', function () {
        pages = 1;
        buttons.removeClass('active');
        $(this).addClass('active');
        type = $(this).prop('id');
        $.ajax({
            url: '/new/index.php/game/change',
            data: { type: type, pages: 1 },
            dataType: 'json',
            success: function success(data) {
                render(data);
            }
        });
    });
    $(buttons[0]).triggerHandler('click');
    //////////////////////////////////////////////////////
    function render(data) {
        main.empty();
        change.removeClass('active');
        data.forEach(function (v) {
            $('<li>').html(v.gname).prependTo(main);
        });
    }
});