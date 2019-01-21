'use strict';

$(function () {
    var top = $('.top');
    var center = $('.center');
    var bottom = $('.bottom');
    var wrapper = $('.main');
    var scroll = $('.scroll');
    var chooseList = [];
    var totalNum = $('.totalNum');
    var wineNum = $('.wineNum');
    var snackNum = $('.snackNum');
    var sure = $('.bottom>a');
    var choose = $('.choose');

    //////////////获取数据////////////////////
    $.ajax({
        /*what time do this type*/
        url: "/new/index.php/category/select",
        dataType: "json",
        success: function success(data) {
            var ctop = data.filter(function (element) {
                return element.ctype == 1;
            });
            var ccenter = data.filter(function (element) {
                return element.ctype == 2;
            });
            var cbottom = data.filter(function (element) {
                return element.ctype == 3;
            });
            console.log(data, ctop);
            render(top, ctop);
            render(center, ccenter);
            render(bottom, cbottom);
        }
    });
    //////////////////////////酒水零食////////////////////////////////////////////////
    var navBtn = $('nav>ul>li');
    navBtn.on('click', function () {
        navBtn.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active');
        wrapper.eq($(this).index()).addClass('active');
    });
    ///////////////////////////商品数量加减同步价钱总数//////////////////////////////
    scroll.on('click', '.plus', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = chooseList.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (v.length) {
            v[0].num++;
            $(this).prev().html(v[0].num);
        } else {
            goods.num = 1;
            $(this).prev().html(1);
            chooseList.push(goods);
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
        renderChooseList(chooseList.slice(0, 2));
    });
    //////////////////购物车减//////////////////////
    scroll.on('click', '.reduce', function () {
        var goods = JSON.parse($(this).closest('li').attr('data'));
        var v = chooseList.filter(function (element) {
            return element.sid == goods.sid;
        });
        if (v.length && v.length >= 0) {
            v[0].num--;
            if (!v[0].num) {
                chooseList = chooseList.filter(function (element) {
                    return element.sid != goods.sid;
                });
            }
            $(this).next().html(v[0].num);
        }
        totalNum.text(calcTotalNum());
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
    });
    /////////////////选好了////////////////////////
    sure.on('click', function (e) {
        e.preventDefault();
        localStorage.setItem('chooseList', JSON.stringify(chooseList));
        location.href = '/new/index.php/shop/shopSure';
    });
    ////////////////////////////////////
    function render(obj, data) {
        obj.empty();
        var str = '';
        $.each(data, function (index, v) {
            str += '\n            <a href="/new/index.php/cgsinger?cid=' + v['cid'] + '"><div style="background: url(' + v['cimg'] + ') no-repeat center/cover;"><div class="des">' + v['cname'] + '</div></div></a>\n            ';
            obj.html(str);
        });
    };
    function creatimg(data) {
        var str = '';
        for (var i = 0; i < data; i++) {
            str += '<span></span>';
        }
        return str;
    }
    function calcTotalNum() {
        var num = 0;
        chooseList.forEach(function (element) {
            console.log(element, element.sprice, element.sprice.split('/')[0]);
            var sprice = element.sprice.split('/')[0];
            num += sprice * element.num;
        });
        //////保留两位小数
        return num.toFixed(2);
    }
    function calcWineNum() {
        var num = 0;
        chooseList.filter(function (ele) {
            return ele.stype == 1;
        }).forEach(function (element) {
            num += element.num;
        });
        return num;
    }
    function calcSnackNum() {
        var num = 0;
        chooseList.filter(function (ele) {
            return ele.stype == 2;
        }).forEach(function (element) {
            num += element.num;
        });
        return num;
    }
    ///////////////已选商品//////////////////
    function renderChooseList(data) {
        /*${data[i].sprice.split('/')[1]}*/
        $('ul', '.choose').empty();
        console.log(data.length);
        var str = '';
        for (var i = 0; i < data.length; i++) {

            str += '\n            <li>\n            <span>' + data[i].sname + '</span><span>' + data[i].num + '</span>\n        </li>\n            ';
        }
        $('ul', '.choose').append(str);
    }
});