$(function () {
    // 登录验证
    var login = window.localStorage.getItem('login_e');
    var phone_number;
    if (!login) {
        window.location.href = 'login.html';
    }else{
        phone();
    }
    // 设置body高度
    var body_h=$(window).height();
    console.log(body_h)
    $('.wide').css({'height':body_h})
    // 获取手机号码
    function phone(){
        $.ajax({
            type: 'get',
            url: 'https://dev-xfhapi.xiaositv.com/my/info',
            data: { user_id: login },
            success: function (res) {
                phone_number = res.data.phone;
                $('#phone').val(phone_number);
            }
        })
    }
    // 获取服务列表
    demand();
    function demand() {
        $.ajax({
            type: 'get',
            url: 'https://dev-xfhapi.xiaositv.com/reservation/demand',
            success: function (res) {
                console.log(res.data);
                var list = res.data;
                for (i in list) {
                    var pact = (i == 0) ? $('<p class="p pactive" data-id="' + list[i].id + '"> ' + list[i].name + '</p>') : $('<p class="p" data-id="' + list[i].id + '">' + list[i].name + '</p>')
                    $('.option').append(pact)
                }

            }
        })
    }
    // 选择意向
    // var option_list = [];
    var option_a={0:1};
    $('.option').on('click', '.p', function (e) {
        if ($(this).siblings().hasClass('pactive')){
            $(this).toggleClass('pactive');
        }else{
            $('.window').text('至少选择一项').show(300);
            setTimeout(function () {
                $('.window').hide(150);
            }, 1000)
        }
        if ($(this).hasClass('pactive')) {
            option_a[$(this).index()]=e.target.dataset.id;
        } else {
            delete option_a[$(this).index()]
        }
        console.log($(this).index(),JSON.stringify(option_a));

    });
    // 阅读服务
    $('.agree .icon').click(function () {
        $(this).toggleClass('icon_checked');
    });
    // 手机号码正则验证
    $('#phone').on('input', function (number) {
        console.log('a')
        var values = number.target.value;
        if (values.length > 11) {
            values = values.substring(0, 11);
            $('#phone').val(values);
        }
    });
    // 身份证号码
    $('#identity').on('input', function (identity) {
        var values = identity.target.value;
        if (values.length > 19) {
            values = values.substring(0, 19);
            $('#identity').val(values);
        }
    })
    // 选择男女
    var sex=1;
    $('.sex div').click(function (e) {
        if(!$(this).hasClass('selected')){
            $(this).addClass('selected').siblings().removeClass('selected');
            $(this).children('img').toggleClass('hide');
            $(this).siblings().children('img').toggleClass('hide');
            sex = (sex == 1) ? 2 : 1;
        }
    });
    // 提交信息
    $('.submit').click(function () {
        var number = $('#phone').val();
        // var identity = $('#identity').val();
        var name = $('#name').val();
        // if ($('.agree .icon').hasClass('icon_checked')) {
            if (!(/^1[34578]\d{9}$/.test(number))) {
                $('.window').text('手机号码有误').show(300);
                setTimeout(function () {
                    $('.window').hide(150);
                }, 1000)
            }
            else if (name.length == 0) {
                $('.window').text('请输入姓名').show(300);
                setTimeout(function () {
                    $('.window').hide(150);
                }, 1000)
            } else {
                // console.log("login:", login, 'number:', number, "name:", name, 'sex:', sex,'option_list:',option_list)
                $.ajax({
                    type: 'get',
                    url: 'https://dev-xfhapi.xiaositv.com/reservation/create',
                    data: {
                        user_id: login,
                        phone:number,
                        name:name,
                        sex:sex,
                        demand_id: JSON.stringify(option_a)
                    },
                    success:function(res){
                        console.log(res);
                        if(res.code==1){
                            window.location.href = 'fill_success.html'
                        }else{
                            $('.window').text('预约失败').show(300);
                            setTimeout(function () {
                                $('.window').hide(150);
                            }, 1000)
                        }
                    }
                })
                console.log('信息完全')
            }
        // } else {
        //     $('.window').text('阅读服务').show(300);
        //     setTimeout(function () {
        //         $('.window').hide(150);
        //     }, 1000)
        // }
    });
    // 返回历史上一页
    $('.icon_left').click(function () {
        $('.window_w').show();
    });
    $('.cancel').click(function () {
        $('.window_w').hide();
    });
    $('.give_up').click(function () {
        // close();
        history.go(-1);
        // self.location = document.referrer;
        // window.location.href='index.html'
    });
    // 判断当前页面关闭
    // window.onbeforeunload = function () {
    //     console.log("Do you really want to close?")
    // };
    // pushHistory();
    // function pushHistory() {
    //     var state = {
    //         title: "title",
    //         url: "#"
    //     };
    //     window.history.pushState(state, "title", "#");
    // };

    //  function close () {
        // console.log('win')
        // $('.window_w').show();
        // location.href = "想要跳转的链接";
        // history.go(-1);
        // alert('aa')
    // };
    // $(window).unload(function(){
    //     close();
    //     console.log('aaa')
    // })
    // window.onpopstate=close();
});