$(function(){
    // 判断是否登录
    var  login=window.localStorage.getItem('login_e');
    console.log(login)
    if(login){
        $('.banner_info').hide();
        $('.banner_white').show();
        $.ajax({
            type:'get',
            url:'https://dev-xfhapi.xiaositv.com/my/info',
            data: { user_id:login},
            success:function(res){
                // 卡号格式
                var card_number = res.data.code;
                card_number = card_number.substring(0, 4) + ' ' + card_number.substring(4, 8) + ' ' + card_number.substring(8, 12);
                $('.banner_white').text(card_number);
            }
        })
    }else{
        $('.banner_info').show();
        $('.banner_white').hide();
    }
    $('.banner_info').click(function(){
        window.location.href="login.html"
    });
    // 获取当前页面的url

    var tab_a = [];
    for (var i = 0; i < $('.tab_list li').length; i++) {
        var a = $('.tab_list li:eq(' + i + ') a').attr('class');
        a = a.replace('active ', '');
        tab_a[i] = a;
    }
    var url=window.location.href;
    const banner_H = $('.banner_g').height() - $('.logo').height();
    const tab_H = $('.tab_list').height();
   if(url.indexOf('=')>-1){
       var index=url.split('=')[1];
       scroll_t(index);
   }
    // 剩余金额格式
    var sheng_num = $('.sheng_num').text();
    var sheng_all = sheng_num.substring(0, 3);
    for (var i = 3; i < sheng_num.length;) {
        sheng_all = sheng_all + ',' + sheng_num.substring(i, i + 3);
        i = i + 3;
    }
    $('.sheng_num').text(sheng_all)

    // tab切换定位
    $('.tab_list li a').click(function () {
        $(this).addClass('active').parent().siblings().children().removeClass('active');
        var index=$(this).parent().index();
        scroll_t(index);
    });
    function scroll_t(index) {
        var M_T = 0;
        if (index == 0) {

        } else {
            for (var i = 0; i < index; i++) {
                M_T = M_T + $('#' + tab_a[i]).height() + 29;
            }
        }
        console.log(M_T, tab_a)
        $('html,body').animate({ 'scrollTop': M_T + banner_H + 15 }, 500);
        // $(window).scrollTop(M_T+banner_H+15);
    }
    // 监听页面滑动
    const logo_H = $('.logo').height();
    const personal_h = $('#personal').height()+29;
    const bao_h = $('#bao').height()+29;
    const child_h =$("#child").height()+29;
    const sea_h = $("#sea").height()+29;
    var ul_top;
    $(window).scroll(function(event){
       var top=$(window).scrollTop();
        var a=$('.tab_list').scrollTop();
        if(top>=banner_H){
            $('.tab_list').addClass('tab_list_a');
            $('.tab').css("margin-top","1.58rem")
        } else {
            $('.banner_g').css({
                "opacity": (top / banner_H)*0.8
            })
            $('.tab_list').removeClass('tab_list_a');
            $('.tab').css("margin-top", "0")
        }
        if (top > 0 && top < banner_H + personal_h){
            $('.personal').addClass('active').parent().siblings().children().removeClass('active')
        } else if (top > banner_H + personal_h && top < banner_H + personal_h+bao_h){
            $('.bao').addClass('active').parent().siblings().children().removeClass('active')
        } else if (top > banner_H + personal_h + bao_h && top < banner_H + personal_h + bao_h+child_h){
            $('.child').addClass('active').parent().siblings().children().removeClass('active')
        } else if (top > banner_H + personal_h + bao_h + child_h && top < banner_H + personal_h + bao_h + child_h+sea_h) {
            $('.sea').addClass('active').parent().siblings().children().removeClass('active')
        }
    });
    // 召唤管家
    $('.guan').click(function(){
        if(login){
            window.location.href = 'butlerservice.html'
        }else{
            window.location.href = 'login.html'
        }
    });
    // 去详情页
    $('#bao .bao_list,.child_list a,.sea_list a').click(function(){
        if(login){
            window.location.href = 'https://mp.weixin.qq.com/s/9fU-cx-r9t058rcDN-W3Kw'
        }else{
            window.location.href='login.html'
        }
        
    })
});