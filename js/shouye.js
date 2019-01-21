$(function(){
    // 检测登录状态
//  $.ajax({
//  	type:"get",
//  	url:"https://dev-xfhapi.xiaositv.com/my/checklogin",
//  	async:true,
//  	success:function(res){
//  		console.log(res)
//  	}
//  });
    // 顶部logo
    var banner_h = $('.banner_bg').height();
    console.log($('.logo').innerHeight())
    $(window).scroll(function(){
        var top =$(window).scrollTop();
        // if(top==0){
        //     $('.logo').css({
        //         "background": ""
        //     })
        // }else if(top>0){
        //     $('.logo').css({
        //         "background": "#29243D"
        //     })
        // }
        // $('#p').text(-top+'a'+ -$('.logo').innerHeight())
        if (-top > 0 && -top < $('.logo').innerHeight()){
            $('.logo').css({
                "background": "rgba(41,36,61,.6)",
            });
        } else if (-top > $('.logo').innerHeight()){
            $('.logo').css({
                "background": "rgba(41,36,61,1)",
            });
        }
        if (top == 0) {
            $('.logo').css({
                "background": ""
            });
        } else if (top > 0) {
            $('.logo').css({
                "background": "rgba(41,36,61,"+top*0.01+")",
            });
        }
        if(top>0&&top<banner_h){
            $('.banner_bg').css({"opacity":(top/banner_h)*0.9})
        }
    });
    // 假如黄金会员
    $('.join').click(function() {
        var login=window.localStorage.getItem('login_e');
        if(login==null){
            window.location.href = "login.html"
        }else{
            window.location.href = 'butlerservice.html'
        }
    });
    // 去详情页
    $('.bannerimg .swiper-slide').click(function () {
        var login = window.localStorage.getItem('login_e');
        if(login){
            window.location.href = 'https://mp.weixin.qq.com/s/9fU-cx-r9t058rcDN-W3Kw'
        }else{
            window.location.href='login.html'
        }
        
    });
    // banner定位到服务页
    $('.classify div').click(function(){
        var index=$(this).index();
        window.location.replace('service.html?tab_a='+index)
    })
});