$(function () {
	// 检测登录状态
	$.ajax({
		type: "get",
		url: "https://dev-xfhapi.xiaositv.com/my/checklogin",
		async: true,
		success: function (res) {
			console.log(res)
		}
	});
	// 设置body高度
	var body_h=$(window).height();
	console.log(body_h);
	$('.container').css({'height':body_h})
	// 手机号码正则验证
	$('#phone').on('input', function (number) {
		var values = number.target.value;
		if (values.length > 11) {
			values = values.substring(0, 11);
			$('#phone').val(values);
		}
	});
	// 规避iphonex验证码复制两次
	$('#code').on('input',function(e){
		console.log(e.target.value);
		if(e.target.value>6){
			$('#code').val(e.target.value.substring(0,6))
		}
	})
	// 倒计时
	var time_flag = true;
	$('.code_btn').click(function () {
		var number = $('#phone').val();
		if (!(/^1[34578]\d{9}$/.test(number))) {
			$('.window').text('手机号码有误').show(300);
			setTimeout(function () {
				$('.window').hide(150);
			}, 1000)
		} else if (time_flag) {
			$.ajax({
				type: 'get',
				url: 'https://dev-xfhapi.xiaositv.com/my/sms',
				data: {
					phone: number
				},
				success: function (res) {
					if (res.data.code == 1) {
						var timeflag = 60;
						time_flag = false;
						var clock = setInterval(function () {
							if (timeflag > 0) {
								timeflag--;
								$('.code_btn').text(timeflag + 's');
							} else {
								clearInterval(clock);
								time_flag = true;
								$('.code_btn').text('获取验证码')
							}
						}, 1000)
					}else{
						$('.window').text('手机号码有误').show(300);
						setTimeout(function () {
							$('.window').hide(150);
						}, 1000)
					}
				}
			})
		}
	});
	// 登陆
	$('#submit').click(function (e) {
		console.log(ajax_s())
		return false;

	})
	function ajax_s(){
		var aaa;
		var number = $('form').serializeArray()[0].value;
		var code = $('form').serializeArray()[1].value;
		$.ajax({
			type:'get',
			async:false,
			url:'https://dev-xfhapi.xiaositv.com/my/login',
			data:{
				phone:number,
				code: code
			},
			success:function(res){
				console.log(res)
				if (res.code == 0) {
					if (!(/^1[34578]\d{9}$/.test(number))){
						$('.window').text('手机号码有误').show(300);
					}else{
						$('.window').text('验证码有误').show(300);
					}
					setTimeout(function () {
						$('.window').hide(150);
					}, 1000);
					aaa=false;
				}else {
					
					localStorage.login_e = res.data.user_id;
					aaa = true;
					console.log(window.localStorage.getItem('login_e'),'login');
					// history.go(-1);
					window.location.replace(document.referrer);
					// self.location = document.referrer;
				}
			}
		})
		return aaa;
	}
	// $('#submit').click(function (e) {
	// 	var number = $('form').serializeArray()[0].value;
	// 	var code = $('form').serializeArray()[1].value;
	// 	console.log(ajax_s(number,code),'ccc');
	// 	// return false;	
	// 	return ajax_s(number, code);	
	// });
	// function ajax_s(number,code){
	// 	var aaa;
	// 	$.ajax({
	// 		type: "get",
	// 		async: false,
	// 		url: "https://dev-xfhapi.xiaositv.com/my/login",
	// 		data: {
	// 			phone: number,
	// 			code: code,
	// 		},
	// 		success: function (res) {
	// 			if (res.code == 0) {
	// 				if (!(/^1[34578]\d{9}$/.test(number))){
	// 					$('.window').text('手机号码有误').show(300);
	// 				}else{
	// 					$('.window').text('验证码有误').show(300);
	// 				}
	// 				setTimeout(function () {
	// 					$('.window').hide(150);
	// 				}, 1000);
	// 				aaa=false;
	// 			}else {
	// 				localStorage.logins = true;
	// 				aaa = true;
	// 				console.log(window.localStorage.getItem('logins'),'login');
	// 			}
	// 		}
	// 	});
	// 	return aaa;
	// }
	// $('#submit').click(function (e) {
	// 	var number = $('form').serializeArray()[0].value;
	// 	var code = $('form').serializeArray()[1].value;
	// 	if((/^1[34578]\d{9}$/.test(number)) && code.length != 0) {
	// 		$.ajax({
	// 			type: "get",
	// 			url: "https://dev-xfhapi.xiaositv.com/my/login",
	// 			async: false,
	// 			data: {
	// 				phone: number,
	// 				code: code,
	// 			},
	// 			success: function (res) {
	// 				if (res.data.code == 0) {
	// 					$('.window').text(res.data.msg).show(300);
	// 					setTimeout(function () {
	// 						$('.window').hide(150);
	// 					}, 1000);
	// 				} else if (res.data.code == 1) {
	// 					localStorage.logins = true;
	// 					console.log(window.localStorage.getItem('logins'))
	// 					window.location.href = 'index.html';
	// 				} else if (res.code == 40500404) {
	// 					$('.window').text(res.msg).show(300);
	// 					setTimeout(function () {
	// 						$('.window').hide(150);
	// 					}, 1000);
	// 				}
	// 			}
	// 		});
	// 	} else if(!(/^1[34578]\d{9}$/.test(number))) {
	// 		if(number.length == 0) {
	// 			$('.window').text('请输入手机号').show(300);
	// 		} else {
	// 			$('.window').text('手机号码有误').show(300);
	// 		}
	// 		setTimeout(function() {
	// 			$('.window').hide(150);
	// 		}, 1000)
	// 	} else if(code.length == 0) {
	// 		$('.window').text('请输入验证码').show(300);
	// 		setTimeout(function() {
	// 			$('.window').hide(150);
	// 		}, 1000)
	// 	}
	// 	return false;
	// });

});