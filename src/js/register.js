window.onload = function() {
    const wsSB = document.getElementById('txt_username');
    const wsSBSPAN = document.querySelector('.cue');

    const wsSB2 = document.querySelector('.wsSB2');
    const wsSBSPAN2 = document.querySelector('.wsSBSPAN2');

    const wsSB3 = document.querySelector('.wsSB3');
    const wsSBSPAN3 = document.querySelector('.wsSBSPAN3');
    const wsSB4 = document.querySelector('.wsSB4');
    const wsSBSPAN4 = document.querySelector('wsSBSPAN4');
    const sub = document.querySelector('.submit')
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    console.log(wsSBSPAN);
    var n = {};

    wsSB.oninput = function(e) {
        var phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
        wsSBSPAN.innerHTML = phoneNumber.test(e.target.value) ? '' : '手机号码格式错误';
        flag1 = phoneNumber.test(e.target.value) ? true : false;
        n.phoneLu = phoneNumber.test(e.target.value);
        wsSBSPAN.style.color = 'red'

        wsSB2.oninput = function(e) {
            var password3 = /^.{6,20}$/
            if (!password3.test(e.target.value)) {
                wsSBSPAN2.innerHTML = '你输入的密码不正确';
                flag2 = false;
            } else {

                wsSB3.value ? wsSB3.value == e.target.value ? wsSBSPAN2.innerHTML = '' : wsSBSPAN2.innerHTML = '俩次密码不相同' : wsSBSPAN2.innerHTML = '';
                flag2 = true;
            }
            n.passNumber = password3.test(e.target.value)
        }

        wsSB3.oninput = function(e) {
            var password3 = /^.{6,20}$/

            if (!password3.test(e.target.value)) {
                wsSBSPAN3.innerHTML = '你输入的密码不正确';
                flag3 = false;
            } else {
                flag3 = true;
                wsSB2.value ? wsSB2.value == e.target.value ? wsSBSPAN3.innerHTML = '' : wsSBSPAN3.innerHTML = '俩次密码不相同' : wsSBSPAN3.innerHTML = ''
            }
            n.passNumber2 = password3.test(e.target.value)
        }
        wsSBSPAN2.style.color = 'red';
        wsSBSPAN3.style.color = 'red';


        // wsSB4.oninput = function(e) {
        //     var email = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/;
        //     if (!email.test(e.target.value)) {
        //         wsSBSPAN4.innerHTML = '你输入的邮箱有误'
        //     } else {
        //         wsSBSPAN4.innerHTML = '√'
        //     }
        // }
    }

    sub.onclick = function(e) {
        let val1 = wsSB.value;
        let val2 = wsSB2.value;


        if (flag1 && flag2 && flag3) {
            $.ajax({
                type: 'POST',
                url: 'http://10.31.162.60/dangdang/php/login.php',
                data: {
                    phone: val1,
                    password: val2,
                    submit: 1

                },
                success: function(data) {
                    console.log(data)
                }
            })
        }
    }
}