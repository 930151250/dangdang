! function() {

    const $phone = $('#txt_username');
    const $password1 = $('.wsSB2');
    const $password2 = $('.wsSB3');
    const $span = $('.cue');
    const $sub = $('.submit');


    let phoneflag = true;
    let password1 = true;
    let password2 = true;

    $phone.on('blur', function() {
        if ($(this).val() !== '') {
            let regphone = /^1[345678]\d{9}$/;
            if (regphone.test($(this).val())) {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.162.60/dangdang/php/register.php',
                    data: {
                        phone: $phone.val()
                    }
                }).done(function(data) {
                    // console.log(data.split('')[1])
                    if (!data.split('')[1]) {
                        $span.eq(0).html('√').css('color', 'green');
                        phoneflag = true;
                    } else {
                        $span.eq(0).html('改号码已注册').css('color', 'red');
                        phoneflag = false;
                    }
                })


            } else {
                $span.eq(0).html('手机号码错误').css('color', 'red');
                phoneflag = false;
            }
        } else {
            $span.eq(0).html('请输入手机号码').css('color', 'red');
            phoneflag = false;
        }
    })


    $password1.on('blur', function() {
        let passcount = $(this).val();
        if (passcount == '') {
            $span.eq(1).html('请输入密码').css('color', 'red');
            password1 = false;
        }
    })
    $password1.on('input', function() {
        let passcount = $(this).val();
        if (passcount.length >= 6 && passcount.length <= 20) {
            let  regnum  =  /\d+/; //一级安全
                        
            let  reglow  =  /[a-z]+/; //二级安全
                        
            let  regupp  =  /[A-Z]+/; //二级安全
                        
            let  regteshu  =  /[\W\_]+/; //三级安全
                        
            let  dengji  =  0;
            if (regnum.test(passcount)) {                 dengji++             }            
            if (reglow.test(passcount)) {                 dengji++             }            
            if (regupp.test(passcount)) {                 dengji++             }            
            if (regteshu.test(passcount)) {                 dengji++             }
            switch (dengji) {
                case  1 :
                       $span.eq(1).html('弱').css("color", "red") ;
                    password1 = false;                                      
                    break;                
                case  2:
                              
                case  3 :
                     $span.eq(1).html('中').css("color", "orange") ;
                    password1 = true;                                      
                    break;                
                case  4 :
                                        $span.eq(1).html('强').css("color", "green") ;
                    password1 = true;                                                                           
                    break;
            }
        } else {
            $span.eq(1).html('密码长度不符合').css('color', 'red');
            password1 = false;
        }
    })
    $password2.on("blur", function() {
        if ($password2.val()  !==  "") {
            if ($password1.val()  === $password2.val()) {
                $span.eq(2).html('√').css('color',  'green');
                password2 = true;
            } else {                
                $span.eq(2).html('密码错误').css('color',  'red'); 
                password2 = false;                     
            }        
        } else {            
            $span.eq(2).html('请输入密码').css('color',  'red'); 
            password2 = false;                  
        }    
    })
    $sub.on('click', function() {

        if ($phone.val() === "") {
            $span.eq(0).html('电话号码不能为空').css('color', 'red');
            phoneflag = false;
        }
        if ($password1.val() === "") {
            $span.eq(1).html('密码不能为空').css('color', 'red');
            password1 = false;
        }
        if ($password2.val() === "") {
            $span.eq(2).html('密码不能为空').css('color', 'red');
            password2 = false;
        }
        console.log(phoneflag, password1, password2)
        if (phoneflag && password1 && password2) {
            console.log($phone.val(), $password1.val())
            $.ajax({
                type: 'post',
                url: 'http://10.31.162.60/dangdang/php/register.php',
                data: {
                    phone: $phone.val(),
                    password: $password1.val()
                }
            }).done(function(data) {

            })

        }
    })
}()