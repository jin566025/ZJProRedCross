var userId = sessionStorage.getItem("userId");
if(!userId){
	var html =  '<a class="login" onclick="window.location.href=\'login.html\'">登录</a>'+
				'<a> | </a>'+
				'<a class="register" onclick="window.location.href=\'register.html\'">注册</a>';
	$(".login-register").html(html)
}
