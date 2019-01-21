$(function(){
    // 登录状态
    var login = window.localStorage.getItem('login_e');
    if (login) {

    }else{
        window.location.href='login.html'
    }
})