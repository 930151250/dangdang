(function() {
    const wsSB = document.getElementById('txt_username');
    const wsSBSPAN = document.querySelector('.cue');

    const wsSB2 = document.querySelector('.wsSB2');
    const wsSBSPAN2 = document.querySelector('.wsSBSPAN2');

    const wsSB3 = document.querySelector('.wsSB3');
    const wsSBSPAN3 = document.querySelector('.wsSBSPAN3');

    var n = {};

    wsSB.oninput = function(e) {
        var phoneNumber = /^1(3|4|5|7|8)\d{9}$/;
        wsSBSPAN.innerHTML = phoneNumber.test(e.target.value) ? '' : '手机号码格式错误';
        n.phoneLu = phoneNumber.test(e.target.value);
        wsSBSPAN.style.color = 'red'

        wsSB2.oninput = function(e) {
            var password3 = /^.{6,20}$/
            if (!password3.test(e.target.value)) {
                wsSBSPAN2.innerHTML = '你输入的密码不正确'
            } else {

                wsSB3.value ? wsSB3.value == e.target.value ? wsSBSPAN2.innerHTML = '' : wsSBSPAN2.innerHTML = '俩次密码不相同' : wsSBSPAN2.innerHTML = ''
            }
            n.passNumber = password3.test(e.target.value)
        }

        wsSB3.oninput = function(e) {
            var password3 = /^.{6,20}$/

            if (!password3.test(e.target.value)) {
                wsSBSPAN3.innerHTML = '你输入的密码不正确'
            } else {
                wsSB2.value ? wsSB2.value == e.target.value ? wsSBSPAN3.innerHTML = '' : wsSBSPAN3.innerHTML = '俩次密码不相同' : wsSBSPAN3.innerHTML = ''
            }
            n.passNumber2 = password3.test(e.target.value)
        }
        wsSBSPAN2.style.color = 'red';
        wsSBSPAN3.style.color = 'red';
    }
})()