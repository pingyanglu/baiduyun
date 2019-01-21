
$(function(){
    let top = $('.top')
    let center = $('.center')
    let bottom = $('.bottom')
    let wrapper = $('.main')
    let scroll = $('.scroll')
    let chooseList = []
    let totalNum = $('.totalNum')
    let wineNum = $('.wineNum')
    let snackNum = $('.snackNum')
    let sure = $('.bottom>a');
    let choose = $('.choose');

    //////////////获取数据////////////////////
    $.ajax({
        /*what time do this type*/
        url:"/new/index.php/category/select",
        dataType:"json",
        success:function(data){
            let ctop = data.filter(element=>element.ctype==1)
            let ccenter= data.filter(element=>element.ctype==2)
            let cbottom= data.filter(element=>element.ctype==3)
            console.log(data,ctop)
            render(top,ctop);
            render(center,ccenter);
            render(bottom,cbottom);
        }
    })
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
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
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
        wineNum.text(calcWineNum());
        snackNum.text(calcSnackNum());
    })
/////////////////选好了////////////////////////
    sure.on('click',function (e) {
        e.preventDefault();
        localStorage.setItem('chooseList',JSON.stringify(chooseList))
        location.href = '/new/index.php/shop/shopSure';
    })
////////////////////////////////////
    function render(obj,data){
        obj.empty();
        let str = '';
         $.each(data,function(index,v){
                str+=`
            <a href="/new/index.php/cgsinger?cid=${v['cid']}"><div style="background: url(${v['cimg']}) no-repeat center/cover;"><div class="des">${v['cname']}</div></div></a>
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
    function calcTotalNum() {
        let num = 0
        chooseList.forEach(element=>{
            console.log(element,element.sprice,element.sprice.split('/')[0])
            let sprice = element.sprice.split('/')[0];
            num += sprice*element.num;
        })
        //////保留两位小数
        return num.toFixed(2);
    }
    function calcWineNum() {
        let num = 0;
        chooseList.filter(ele=>ele.stype==1).forEach(element=>{
            num += element.num;
        })
        return num;
    }
    function calcSnackNum() {
        let num = 0;
        chooseList.filter(ele=>ele.stype==2).forEach(element=>{
            num += element.num;
        })
        return num;
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