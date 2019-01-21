$(function(){
    let winelist = $('.winelist>ul')
    let snacklist = $('.snacklist>ul')
    let wrapper = $('.main')
    let scroll = $('.scroll')
    let totalNum = $('.totalNum')
    let wineNum = $('.wineNum')
    let shopSure = $('.bottom>a');
    let choose = $('.choose');
    function loaded(){
        let  myScroll = new IScroll('#wrapper',,{click:true});
    }

    //////////////获取数据////////////////////
    let chooseList = JSON.parse(localStorage.getItem('chooseList'));
    render(winelist,chooseList);
    totalNum.text(calcTotalNum());
    wineNum.text(calcAllNum());
    renderChooseList(chooseList.slice(0,2));
    //////////////////////////酒水零食////////////////////////////////////////////////
    let navBtn=$('nav>ul>li');
    navBtn.on('click',function(){
        navBtn.removeClass('active');
        $(this).addClass('active');
        wrapper.removeClass('active')
        wrapper.eq($(this).index()).addClass('active')

    })
    ///////////////////////////商品数量加减同步价钱总数//////////////////////////////
    scroll.on('click','.plus',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'));
        let v = chooseList.filter(element=>element.sid == goods.sid);
        if(v.length){
            v[0].num++;
            $(this).prev().html(v[0].num)
        }else{
            goods.num = 1;
            $(this).prev().html(1)
            chooseList.push(goods)
        }
        totalNum.text(calcTotalNum());
       /* wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());*/
        renderChooseList(chooseList.slice(0,2));
    })
    //////////////////购物车减//////////////////////
    scroll.on('click','.reduce',function () {
        let goods = JSON.parse($(this).closest('li').attr('data'));
        let v = chooseList.filter(element=>element.sid == goods.sid);
        if(v.length && v.length >= 0){
            v[0].num--;
            if(!v[0].num){
                chooseList = chooseList.filter(element=>element.sid != goods.sid)
            }
            $(this).next().html(v[0].num);
        }
        totalNum.text(calcTotalNum());
        /*wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());*/
    })

///////////////////////提交订单///////////////////////////////////////////////
    shopSure.on('click',function(){
        console.log('点到了');
        let newarr = [];
        chooseList.forEach(ele=>{
            /*let obj = {sid:ele.sid,count:ele.num,total:ele.sprice*ele.num}
            newarr.push(obj);*/
            let {sid,num,sprice} = ele;
            newarr.push({sid,num,sprice});
            $.ajax('/new/index.php/shop/submit',{
                data:{order:JSON.stringify(newarr)},
                method:'get',
                success:function (data) {
                    if(data=='ok'){
                        alert('sucess');
                    }else{
                        console.log('失败');
                    }
                }
            })
        })
    })
////////////////////////////////////
    function render(obj,data){
        obj.empty();
        let str = '';
        $.each(data,function(index,v){
            str+=`
            <li data='${JSON.stringify(v)}'>
            <div class="left">
                <img src="${v['simg']}" alt="">
            </div>
            <div class="right">
                <div>
                    <span>${v['sname']}</span>
                    ${creatimg(`${v.shot}`)}
                </div>
                <div>
                    ￥<span>${v['sprice']}</span>/瓶
                </div>
                <div>
                    <span class="reduce"></span>
                    <span class="count">${v['num']}</span>
                    <span class="plus"></span>
                </div>
            </div>
        </li>
            `
            obj.html(str);
        })
    };
    function creatimg(data) {
        let str = '';
        for(let i =0;i<data;i++){
            str += `<span></span>`
        }
        return str;
    }
    function calcAllNum() {
        let num = 0;
        chooseList.forEach(element=>{
            num += element.num;
        })
        return num;
    }
    function calcTotalNum() {
        let num = 0
        chooseList.forEach(element=>{
            let sprice = element.sprice.split('/')[0];
            num += sprice*element.num;
        })
        return num.toFixed(2);//保留两位小数
    }
    ///////////////已选商品//////////////////
    function renderChooseList(data){/*${data[i].sprice.split('/')[1]}*/
        $('ul','.choose').empty();
        console.log(data.length)
        let str = '';
        for(let i=0;i<data.length;i++){

            str += `
            <li>
            <span>${data[i].sname}</span><span>${data[i].num}</span>
        </li>
            `
        }
        $('ul','.choose').append(str);
    }
})


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