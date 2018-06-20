$(".nav").click(function(){
	
	var index = $(this).index()
	if(index==0){
		window.location.href="index.html"
	}else if(index==1){
		window.location.href="video-list.html"
	}else if(index==2){
		window.location.href="class-list.html"
	}else if(index==3){
		window.location.href="personal.html"
	}
})


$(".btn-baoming").click(function(){
	window.location.href="index-detail.html"
})





$(document).on("click",".video-content",function(){
	window.location.href="video-player.html"
})



$(".login").click(function(){
	window.location.href="login.html"
})
$(".register").click(function(){
	window.location.href="register.html"
})


$(".my-test").click(function(){
	window.location.href="personal-test.html"
})
$(".start").click(function(){
	window.location.href="test-content.html"
})


$(".return").click(function(){
	window.location.href="index.html"
})



$(".personal-info").click(function(){
	if($(this).hasClass("opened")){
		$(this).removeClass("opened");
		$(".personal-info-nav").hide()
	}else{
		$(this).addClass("opened");
		$(".personal-info-nav").show()
	}
})