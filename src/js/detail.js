! function($) {
    //购物车的注意事项
    //1.购物车的核心存储什么：
    //商品的编号：
    //商品的数量：

    //2.怎么存储--数组
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    //3.点击加入购物车按钮(确定是第一次点击还是多次点击)
    //第一次点击：在购物车列表页面创建商品列表
    //多次点击：之前创建过商品列表，只需要数量增加。

    //取出cookie,才能判断是第一次还是多次点击
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }



    $('.p-btn a').on('click', function() {
        //获取当前商品对应的sid
        let $sid = $(this).parents('.goodsinfo').find('#smallpic').attr('sid');
        //判断是第一次点击还是多次点击
        //多次点击
        //$.inArray(value,array,[fromIndex])
        //确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        cookietoarray();
        if ($.inArray($sid, arrsid) != -1) { //$sid存在，商品列表存在，数量累加
            //先取出cookie中存在的数量+当前添加的数量，一起添加到cookie中。
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val()); //取值
            arrnum[$.inArray($sid, arrsid)] = $num; //赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            //第一次点击加入购物车按钮,将商品的sid和商品的数量放到提前准备的数组里面，然后将数组传入cookie.
            arrsid.push($sid); //将编号$sid push到arrsid数组中
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($('#count').val()); //将数量push到arrnum数组中
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('按钮触发了');
    });


}(jQuery)