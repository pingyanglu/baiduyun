'use strict';

$(function () {
    var winelist = $('.winelist>ul');
    var snacklist = $('.snacklist>ul');
    var wrapper = $('.main');
    var scroll = $('.scroll');
    var totalNum = $('.totalNum');
    var wineNum = $('.wineNum');
    var shopSure = $('.bottom>a');
    var choose = $('.choose');
    function loaded() {
        var myScroll = new IScroll('#wrapper');
    }

    //////////////获取数据////////////////////
    var chooseList = JSON.parse(localStorage.getItem('chooseList'));
    render(winelist, chooseList);
    totalNum.text(calcTotalNum());
    wineNum.text(calcAllNum());
    renderChooseList(chooseList.slice(0, 2));
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
        /* wineNum.text(calcWineNum());
         snackNum.text(calcSnackNum());*/
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
        /*wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());*/
    });

    ///////////////////////提交订单///////////////////////////////////////////////
    shopSure.on('click', function () {
        console.log('点到了');
        var newarr = [];
        chooseList.forEach(function (ele) {
            /*let obj = {sid:ele.sid,count:ele.num,total:ele.sprice*ele.num}
            newarr.push(obj);*/
            var sid = ele.sid,
                num = ele.num,
                sprice = ele.sprice;

            newarr.push({ sid: sid, num: num, sprice: sprice });
            $.ajax('/new/index.php/shop/submit', {
                data: { order: JSON.stringify(newarr) },
                method: 'get',
                success: function success(data) {
                    if (data == 'ok') {
                        alert('sucess');
                    } else {
                        console.log('失败');
                    }
                }
            });
        });
    });
    ////////////////////////////////////
    function render(obj, data) {
        obj.empty();
        var str = '';
        $.each(data, function (index, v) {
            str += '\n            <li data=\'' + JSON.stringify(v) + '\'>\n            <div class="left">\n                <img src="' + v['simg'] + '" alt="">\n            </div>\n            <div class="right">\n                <div>\n                    <span>' + v['sname'] + '</span>\n                    ' + creatimg('' + v.shot) + '\n                </div>\n                <div>\n                    \uFFE5<span>' + v['sprice'] + '</span>/\u74F6\n                </div>\n                <div>\n                    <span class="reduce"></span>\n                    <span class="count">' + v['num'] + '</span>\n                    <span class="plus"></span>\n                </div>\n            </div>\n        </li>\n            ';
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
    function calcAllNum() {
        var num = 0;
        chooseList.forEach(function (element) {
            num += element.num;
        });
        return num;
    }
    function calcTotalNum() {
        var num = 0;
        chooseList.forEach(function (element) {
            var sprice = element.sprice.split('/')[0];
            num += sprice * element.num;
        });
        return num.toFixed(2); //保留两位小数
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

////////////////////////////////////

/*
* id  user  time                status
*  1   zhang  11/15  18.01        1/2(接单/支付)
*orderextra
*eid  sid/sname  count  price  oid
*1    1 啤酒     3      15     1(谁的订单)
*
* 前台
* chooseList
* [
*   {sid,sname,sprice...}
* ]
*
*
* json_decode();
* */