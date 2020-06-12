! function($) {

    function showlist(sid, num) {
        $.ajax({
            url: 'http://10.31.162.60/dangdang/php/data.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.find('.goodspic').find('img').attr('src', value.url);
                    $clonebox.find('.goodspic').find('img').attr('sid', value.sid);
                    $clonebox.find('.goodstitle').find('a').html(value.title);
                    $clonebox.find('price').find('strong').html(value.price);
                    $clonebox.find('quantity').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('price').find('strong').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.itemlist').append($clonebox);
                    calcprice(); //计算总价
                }
            })
        })
    }
    //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(',');
        let n = $.cookie('cookienum').split(',');
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
        })
    }
    //3计算总价--使用次数很多--函数封装
    function calcprice() {
        let $sum = 0; //商品件数
        let $count = 0; //商品总价
        $('.goods-item:visible').each(function(index, ele) {
            if ($(ele).find('.checkbox input').prop('checked')) { //复选框勾选
                $sum += parseInt($(ele).find('.quantity input').val());
                $count += parseFloat($(ele).find('.sum strong').html());
            }
        });
        $('.amount-sum').find('a').html($sum);
        $('totalprice').html($count.toFixed(2));

    }
    //4全选
    $('.allsel').on('change', function() {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        calcprice(); //计算总价
    });
    let $inputs = $('.goods-item:visible').find(':checkbox');
    $('.itemlist').on('change', $inputs, function() {
        if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        calcprice(); //计算总价
    })

    //5数量的改变
    $('.quantity-add').on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity input').val();
        $num++;
        $(this).parents('.goods-item').find('.quantity input').val($num);
        $(this).parents('.goods-item').find('.sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    })

    $('.quantity-down').on('click', function() {
        let $num = $(this).parents('.goods-item').find('.quantity input').val();
        $num--;
        if ($num < 1) {
            $num == 1;
        }
        $(this).parents('.goods-item').find('.quantity input').val($num);
        $(this).parents('.goods-item').find('.sum strong').html(calcsingleprice($(this)));
        calcprice(); //计算总价
        setcookie($(this));
    })

    $('.quantity input').on('input', function() {
        let $reg = /^\d+$/g; //只能输入数字
        let $value = $(this).val();
        if (!$reg.test($value)) { //不是数字
            $(this).val(1);
            $(this).parents('.goods-item').find('.sum strong').html(calcsingleprice($(this)));
            calcprice(); //计算总价
            setcookie($(this));
        }
    });
    //计算总价
    function calcsingleprice(obj) {
        let $dj = parseFloat(obj.parents('.goods-item').find('.price strong').html());
        let $num = parseInt(obj.parents('.goods-item').find('.quantity input').val());
        return ($dj * $num).toFixed(2)
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
        let $sid = obj.parents('.goods-item').find('img').attr('sid');
        arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity input').val();
        jscookie.add('cookienum', arrnum, 10);
    }

    //
}(jQuery)