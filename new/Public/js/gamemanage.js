'use strict';

var data = new FormData($('form')[0]);
$(function () {
    if (!location.hash) {
        // location.hash = '#add';
        location.herf = location.pathname + '#list';
    }
    var tbody = $('tbody');
    $(window).on('hashchange', function () {
        $('#myTab>li').removeClass('active');
        $(location.hash).closest('li').addClass('active');
        $('.tab-content div').removeClass('active');
        $(location.hash + '-tab').addClass('active');
        if (location.hash == '#list') {
            $.ajax({
                url: '/new/index.php/gamemanage/show',
                dataType: 'json',
                success: function success(data) {
                    render(data);
                }
            });
        }
    });
    $(window).triggerHandler('hashchange');
    ////////////////////////////////////////////////
    var submit = $(':submit');
    submit.on('click', function () {
        var data = $('form').serialize();
        console.log(data);
        $.ajax({
            url: '/new/index.php/gamemanage/insert?' + data,
            success: function success(data) {
                if (data == 'ok') {
                    location.href = location.pathname + '#list';
                } else {
                    alert('fail');
                }
            }
        });
        return false;
    });
    ///////////////////////////////////////
    tbody.on('click', '.btn', function () {
        var tr = $(this).closest('tr');
        var ids = tr.attr('id');
        $.ajax({
            url: '/new/index.php/gamemanage/delete',
            data: { id: ids },
            success: function success(data) {
                if (data == 'ok') {
                    tr.remove();
                } else if (data == 'error') {
                    alert('fail');
                }
            }
        });
    });
    ///////////////////////////////////////////////
    tbody.on('blur', 'input', function (e) {
        var value = $(this).val();
        var type = $(this).closest('td').attr('type');
        var ids = $(this).closest('tr').attr('id');
        console.log(value, type, ids);
        $.ajax({
            url: '/new/index.php/gamemanage/update',
            data: { id: ids, value: value, type: type },
            success: function success(data) {
                console.log(data);
                if (data == 'ok') {
                    location.href = location.pathname + '#list';
                } else if (data == 'fail') {
                    alert('未修改');
                }
            }
        });
    });

    ////////////////////////////////////////////////
    function render(data) {
        tbody.html(); /*?有啥用 啊这两个*/
        tbody.empty();
        var str = '';
        data.forEach(function (v) {
            str += '\n               <tr id=\'' + v.gid + '\'>\n                    <td type="gid">\n                       <input type="text" value="' + v['gid'] + '" disabled="disabled">\n                    </td>\n                    <td type="gname">                  \n                        <input type="text" value="' + v['gname'] + '">\n                    </td>\n                    <td type="type">\n                        <input type="text" value="' + v['type'] + '">\n                    </td>\n                    <td>\n                        <button class="btn btn-info">\u5220\u9664</button>\n                    </td>\n               </tr>\n            ';
        });
        tbody.html(str);
    }
});