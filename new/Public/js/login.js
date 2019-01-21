'use strict';

$(function () {
    var user = $('#user');
    var pass = $('#pass');
    var sub = $(':submit');
    var form = $('form');

    $('input').on('blur', function () {
        var e = $(this);
        if (e.attr('data-validate')) {
            var value = e.val().trim();
            var validate = e.attr('data-validate').split(';');
            var flag = true;
            for (var i = 0; i < validate.length; i++) {
                var arr = validate[i].split(':');
                if (!validateType(value, arr[0])) {
                    $(this).closest('.form-group').find('.form-help').remove();
                    $('<div>').addClass('form-help').insertAfter(this).text(arr[1]);
                    flag = false;
                    break;
                }
            }
            if (flag) {
                $(this).closest('.form-group').find('.form-help').remove();
            }
        }
    });
    function validateType(value, type) {
        switch (type) {
            case 'require':
                return !!value.length; /*/[^(^\s*|\s*)$].test(value)/*/
                break;
            case 'username':
                return (/^[a-zA-Z]{3,10}$/.test(value)
                );
                break;
            case 'password':
                return (/^\w{6,10}$/.test(value)
                );
                break;
        }
    }

    sub.on('click', function () {
        // let data={user:user.val(),pass:pass.val()};
        $('input').trigger('blur');
        var data = form.serializeArray();
        var obj = {};
        // let dataStr = from.serialize();
        /*
        * [
        * {name:'user',value:'admin'},
        * {name:'pass',value:'123456'}
        * ]
        * ∨
        *①{user:'admin',pass:'123456'}
        *②user=admin&pass=123456;
        *
        * */
        $.each(data, function (i, v) {
            obj[v.name] = v.value;
        });
        console.log(obj);

        $.ajax({
            url: '/new/index.php/login/check',
            data: obj,
            success: function success(data) {
                console.log(data);
                if (data == 'ok') {
                    location.href = "/new/index.php/gamemanage";
                    console.log(123);
                } else {
                    alert('fail');
                }
            }
        });
        return false;
    });
});