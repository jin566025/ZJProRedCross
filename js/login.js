$(function(){
	//注册
	$("#register").click(function(){
		register();
	})
	//登录
	$("#login-submit").click(function(){
		login();
	})
	$(".yzm-input2").click(function(){
		getForgetSMS();
	})
	$("#change-submit").click(function(){
		forgetPassWord()
	})
//	function BindEnter(id) {
//	 	if (event.keyCode == 13) {
//		    event.cancelBubble = true;
//		    event.returnValue = false;
//		    document.getElementById(id).click();
//	   }
//	}
//	BindEnter("login-submit");
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
			$("#login-submit").click(); 
			$("#register").click();
			$("#change-submit").click();
		} 
	}); 
	function forgetPassWord(){
		var username = $("#change-password-user").val();
		var validateCode = $(".yzm-input").val();
		var newpassword = $("#change-newpassword").val();
		var newpassword2 = $("#change-newpassword2").val();
		if(!username){
			$("#login-tip1").html("请输入用户名");
			return false;
		}
		if(!validateCode){
			$("#login-tip2").html("请输入验证码");
			return false;
		}
		if(!newpassword){
			$("#login-tip3").html("请输入新密码");
			return false;
		}
		if(!newpassword2){
			$("#login-tip4").html("请输入新密码");
			return false;
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/forgetPassword.json",
			data:{
				"username":username,
				"newpassword":newpassword,
				"validateCode":validateCode
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					window.location.href="login.html"
				}
			},
			error:function(){}
		});
	}
	function getForgetSMS(){
		var username = $("#change-password-user").val();
		if(!username){
			$("#login-tip1").html("请输入用户名");
			return false;
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/getForgetSMS.json",
			data:{
				"username":username
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					$("#login-tip1").html("");
					var time = 60;
					$(".yzm-input2").addClass("disabled")
					var TimeInterVal = setInterval(function(){
						time = time-1;
						$(".yzm-input2").html(time);
					},1000)
					setTimeout(function(){
						$(".yzm-input2").html("获取验证码").removeClass("disabled");
						window.clearInterval(TimeInterVal);
					},60000)
				}
			},
			error:function(){}
			
		});
	}
	function login(){
		var username = $("#login-user").val();
		var password = $("#login-password").val();
		if(!username){
			$("#login-tip1").html("请输入账号")
			return false;
		}else{
			$("#login-tip1").html("")
		}
		if(!password){
			$("#login-tip2").html("请输入密码")
			return false;
		}else{
			$("#login-tip2").html("")
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/login.json",
			data:{
				"username":username,
				"password":password
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				$("#loading").fadeIn();
				$("#shadow").fadeIn();
				if(data.msg=="成功"){
					sessionStorage.setItem("userId",data.userId);
					if(data.redUserId){
						sessionStorage.setItem("redUserId",data.redUserId);
					}
					
					setTimeout(function(){
						window.location.href="index.html"
					},500)
				}else{
					$("#login-tip3").html(data.msg);
					$("#loading").fadeOut();
					$("#shadow").fadeOut();
				}
			},
			error:function(xml){
				console.log(xml)
			}
		});
	}
	function register(){
		var username = $("#register-user").val();
		var password = $("#register-password").val();
		var password2 = $("#register-password2").val();
		if(!username){
			$("#register-tip1").html("请输入账号")
			return false;
		}else{
			$("#register-tip1").html("")
		}
		if(!password){
			$("#register-tip2").html("请输入密码")
			return false;
		}else{
			$("#register-tip2").html("")
		}
		if(!password2){
			$("#register-tip3").html("请再次输入密码")
			return false;
		}else{
			$("#register-tip3").html("")
		}
		
		$.ajax({
			type:"post",
			url:url_path+"/user/register.json",
			data:{
				"username":username,
				"password":password
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					
					$("#register-tip4").css("visibility","visible").html("注册成功,<span id=\"second\">3</span>秒后返回");
					var second = 3
					setInterval(function(){
						second = second-1;
						$("#second").html(second)
					},1000)
					setTimeout(function(){
						window.location.href='login.html'
					},3000)
				}else{
					$("#register-tip4").css("visibility","visible").html(data.msg);
				}
			},
			error:function(){}
		});
	}
})
