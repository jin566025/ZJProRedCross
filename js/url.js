var url_path = "http://192.168.16.100:8080/ZJProRedCross/rest";
//var url_path = "http://v1783y3356.iask.in:33923/ZJProRedCross/rest";
var userId = sessionStorage.getItem("userId")
var redUserId = sessionStorage.getItem("redUserId");
var img_url = "http://192.168.16.100:8080";
$("#quit").click(function(){
	sessionStorage.removeItem("userId");
	sessionStorage.removeItem("redUserId")
	setTimeout(function(){
		window.location.href="login.html";
	},500)
})
$(".personal-info").click(function(){
	if($(this).hasClass("openeing")){
		$(".personal-info-nav").hide();
		$(this).removeClass("openeing");
	}else{
		$(".personal-info-nav").show();
		$(this).addClass("openeing");
	}
})

