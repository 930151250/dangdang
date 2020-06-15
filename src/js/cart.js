! function($) {
    const $user = $('.name');
    const $exit = $('.exit_login');
    const $allSelected = $('.all_selected');
    const $selected = $('.selected');
    const $cart_name = $('.cart-name input');
    const $cart_price = $('.cart-price');
    const $cart_img = $('.cart-img');
    //商品种类 的数量
    const $cartTotalNum = $('.cartTotalNum');
    //选中的数量
    const $selTotalNam = $('.selTotalNam');
    // 总价
    const $totalPrice = $('.totalPrice em');

    // 0.根据本地存储，显示用户信息
    if (localStorage.getItem('username')) {
        $('.topbar-info .name').html(localStorage.getItem('username'));
    }

    $('.exit_login').on('click', function() {
        localStorage.removeItem('username');
        location.href = "index.html";
    });

    // 1.获取所有的接口数据，根据cookie渲染对用的商品
    function showlist(sid, sum) {
        $.ajax({
            url: 'http://10.31.162.60/dangdang/php/data.php',
            dataType: 'json'
        }).done(function(data) {
            // console.log(data);
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    // alert('1');
                    // 渲染的数据不能直接获取到，可以先克隆,一份后隐藏
                    let $cloneItemBox = $('.item-box:hidden').clone(true, true); //深复制
                    $cloneItemBox.find('.cart-img').find('img').attr('src', value.goods_small_logo);
                    $cloneItemBox.find('.cart-img').find('img').attr('sid', value.sid);
                    $cloneItemBox.find('.cart-name').html(value.goods_title);
                    $cloneItemBox.find('.cart-price').html(value.price);
                    $cloneItemBox.find('.cart-num').find('#goods_nums').val(sum);
                    $cloneItemBox.find('.cart-total').html((value.price * sum).toFixed(2));
                    $cloneItemBox.css('display', 'block');
                    $('.cart_body').append($cloneItemBox);
                    calcprice(); //总价
                }

            });

        });
    }

    // 2.获取cookie 渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        // 接受cookie,转化为一个数组
        let sid = $.cookie('cookiesid').split(',');
        let sum = $.cookie('cookienum').split(',');

        console.log(sid, sum);
        $.each(sid, function(index, value) {
            showlist(sid[index], sum[index]);
            //    console.log(sid[index],sum[index]);
        });
    }
    //3.计算价格
    function calcprice() {
        let $count = 0; //已选择商品的件数
        let $counts = 0; //全部商品件数
        let $singlePrice = 0; //单个商品的总价
        $('.item-box:visible').each(function(index, ele) {
            if ($(ele).find('.cart-check input')) { //全部商品数量
                $counts += parseInt($(ele).find('#goods_nums').val());
            }
            $cartTotalNum.html($counts);
            //选中商品的数量
            //  $selTotalNam.html($count);
            if ($(ele).find('.cart-check input').prop('checked')) { //复选框勾选
                //计算商品数量和单个商品总价格
                $count += parseInt($(ele).find('#goods_nums').val());
                $singlePrice += parseFloat($(ele).find('.singlePrice').html());

            }
        });
        //选中商品的数量
        $selTotalNam.html($count);
        //总价
        $totalPrice.text($singlePrice.toFixed(2));
    }

    //4.全选
    $('#allCK').on('change', function() { //全选按钮发生改变
        //其他的input全部勾选，全选就勾选，
        $('.item-box:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('#allCK').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    // :checkbox 选择器选取类型为 checkbox 的 <input> 元素。
    let $inputs = $('.item-box:visible').find(':checkbox');
    // console.log($inputs);
    //事件委托，判断是否全选
    $('.cart_list').on('change', $inputs, function() {

        if ($('.item-box:visible').find(':checkbox').length === $('.item-box:visible').find('input:checked').size()) {
            $('#allCK').prop('checked', true);
        } else {
            $('#allCK').prop('checked', false);
        }
        calcprice(); //计算总价
    });
    //5.step加减数量
    $('.quantity-add').on('click', function() {
        //    console.log($(this).parents('.item-box'));
        let $count = $(this).parents('.item-box').find('.cart-num input ').val();
        $count++;
        $(this).parents('.item-box').find('#goods_nums').val($count);

        $(this).parents('.item-box').find('.singlePrice').html(checkPrice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });


    $('.quantity-down').on('click', function() {
        let $count = $(this).parents('.item-box').find('#goods_nums').val();

        $count--;
        if ($count < 1) {
            $count = 1;
        }
        // 
        $(this).parents('.item-box').find('#goods_nums').val($count);

        $(this).parents('.item-box').find('.singlePrice').html(checkPrice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    });

    //输入框只能那个输入数字
    $('.cart-num input').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
        }
        $(this).parents('.item-box').find('.singlePrice').html(checkPrice($(this)));

        calcprice(); //计算总价
        setcookie($(this));
    });

    //计算单价
    function checkPrice(obj) { //obj元素对象
        let $unit_price = parseFloat(obj.parents('.item-box').find('.unit-price').html());
        // console.log($unit_price);
        let $count = parseInt(obj.parents('.item-box').find('#goods_nums').val());
        // console.log($count);
        return ($unit_price * $count).toFixed(2);
    }



    //将改变后的数量存放到cookie中
    let arrsid = []; //存储商品的编号。
    let arrnum = []; //存储商品的数量。
    function cookietoarray() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
            arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        cookietoarray();
        let $sid = obj.parents('.cart_list').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.cart_list').find('.cart-num input').val();
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }

    //6.删除
    function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组
        let $index = -1; //删除的索引位置
        $.each(arrsid, function(index, value) {
            if (sid === value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);

        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }

    // 删除单个商品
    $('.icon-del').on('click', function() {
        cookietoarray();
        $(this).parents('.item-box').remove();
        delcookie($(this).parents('.item-box').find('img').attr('sid'), arrsid);
        calcprice(); //计算总价

    });

    //删除选中的商品

    $('#delselect').on('click', function() {
        cookietoarray();
        if (window.confirm('你确定要全部删除吗?')) {
            $('.item-box:visible').each(function() {
                if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
                    $(this).remove();
                    delcookie($(this).find('img').attr('sid'), arrsid);
                }
            });

            calcprice(); //计算总价
        }
    })



}(jQuery);