! function($) {
    $('.btn').on('click', function() {
        if ($('.phone').val() !== '' && $('.pass').val() !== '') {
            $.ajax({
                type: 'post',
                url: 'http://10.31.162.60/dangdang/php/login.php',
                data: {
                    phone: $('.phone').val(),
                    pass: $('.pass').val()
                }
            }).done(function(result) {
                if (result) {
                    location.href = 'index.html';
                    localStorage.setItem('phone', $('.phone').val());
                } else {
                    $('pass').val('');
                    alert('用户名或密码错误')
                }
            })
        } else {
            alert('输入手机号和密码')
        }

    })
}(jQuery)