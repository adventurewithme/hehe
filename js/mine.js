$(function () {
    $('#myorder').on('click', function () {
        window.location.href = 'myorder.html'
    });
    // 判断登录
    var login = window.localStorage.getItem('login_e');
    console.log(login,'login')
    if(login){
        $.ajax({
            type: 'get',
            url: 'https://dev-xfhapi.xiaositv.com/my/info',
            data: { user_id: login },
            success: function (res) {

                // 手机号码显示***
                var phone =res.data.phone;
                phone = phone.substring(0, 3) + "****" + phone.substring(7, 11);
                $('.phone').text(phone);
            }
        })
    };
    // 退出登录
    $('#out').click(function(){
        $('.window_w').show();
    });
    $('.cancel').click(function(){
        $('.window_w').hide();
    });
    $('.give_up').click(function(){
        localStorage.login_e = '';
        window.location.reload();
        console.log(window.localStorage.getItem('login_e'), 'sss');
        window.location.replace('login.html')
    })


});