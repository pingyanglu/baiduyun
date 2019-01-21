'use strict';

$(function () {
    var myScroll = void 0;
    var myScroll1 = void 0;
    var winelist = $('.winelist>ul');
    var snacklist = $('.snacklist>ul');
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
        url: "/new/index.php/shop/select",
        dataType: "json",
        success: function success(data) {
            var wineData = data.filter(function (element) {
                return element.stype == 1;
            });
            var snackData = data.filter(function (element) {
                return element.stype == 2;
            });
            render(winelist, wineData);
            render(snacklist, snackData);
            myScroll = new IScroll('.winelist');
            myScroll1 = new IScroll('.snacklist');
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
            str += '\n            <li data=\'' + JSON.stringify(v) + '\'>\n            <div class="left">\n                <img src="' + v['simg'] + '" alt="">\n            </div>\n            <div class="right">\n                <div>\n                    <span>' + v['sname'] + '</span>\n                    ' + creatimg('' + v.shot) + '\n                </div>\n                <div>\n                    \uFFE5<span>' + v['sprice'] + '</span>/\u74F6\n                </div>\n                <div>\n                    <span class="reduce"></span>\n                    <span class="count">0</span>\n                    <span class="plus"></span>\n                </div>\n            </div>\n        </li>\n            ';
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