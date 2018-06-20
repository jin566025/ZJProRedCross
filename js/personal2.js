$(function(){
	$(".content-right-nav").click(function(){
		var nav_index = $(this).index();
		if($(this).hasClass("content-right-nav-active")){
			
		}else{
			$(".content-right-nav").removeClass("content-right-nav-active")
			$(this).addClass("content-right-nav-active");
			$(".nav-content").hide();
			$(".nav-content").eq(nav_index).show()

		}
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
	$("#quit").click(function(){
		sessionStorage.removeItem("userId")
		setTimeout(function(){
			window.location.href="login.html";
		},500)
	})
	
	$("#send-yzm").click(function(){

		getValidateCodeByPhone();
	})
	$(".send-yzm2").click(function(){
		checkValidateCode();
	})
	function checkValidateCode(){
		var phone = $("#phone2").val();
		if(!phone){
			alert("请输入手机号");
			return false;
		}
		var yzm = $("#yzm").val();
		if(!yzm){
			alert("请输入验证码");
			return false;
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/checkValidateCode.json",
			data:{
				"phone":phone,
				"code":yzm
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					alert("校验成功")
				}
			},
			error:function(){}
		});
	}
	function getValidateCodeByPhone(){
		
		var phone = $("#phone2").val();
		if(!phone){
			alert("请输入手机号");
			return false;
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/getValidateCodeByPhone.json",
			data:{
				"phone":phone
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					$("#login-tip1").html("");
					var time = 60;
					$("#send-yzm").addClass("disabled")
					var TimeInterVal = setInterval(function(){
						time = time-1;
						$("#send-yzm").html(time);
					},1000)
					setTimeout(function(){
						$("#send-yzm").html("发送验证码").removeClass("disabled");
						window.clearInterval(TimeInterVal);
					},60000)
				}
			},
			error:function(){}
		});
	}
	function getUserInfo(userId){
		$.ajax({
			type:"post",
			url:url_path+"/user/getPersonalInfo.json",
			data:{
				"userId":userId
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					if(data.name && data.idType && data.idNumber){
						var type = data.idType;
						var typeStr;
						if(type==1){
							typeStr="身份证"
						}else if(type==2){
							typeStr="护照"
						}else if(type==3){
							typeStr="军官证"
						}else if(type==4){
							typeStr="驾照"
						}
						
						$("#name2").html(data.name);
						$("#idType2").html(typeStr);
						$("#idNumber2").html(data.idNumber);
						$(".section-container1").hide();
						$(".section-container2").show();
						
						if(data.address){
							$("#address").val(data.address)
						}
						if(data.bornDate){
							var datas = data.bornDate;
							datas = datas.replace(/-/g,"");
							datas = datas.substring(0,8);
							$("#bornDate").val(datas)
						}
						if(data.email){
							$("#email").val(data.email)
						}
						if(data.fixedTel){
							$("#fixedTel").val(data.fixedTel)
						}
						if(data.national){
							$("#national").val(data.national)
						}
						if(data.phone){
							$("#phone").val(data.phone)
						}
						if(data.positionalTitle){
							$("#positionalTitle").val(data.positionalTitle)
						}
						if(data.professional){
							$("#professional").val(data.professional)
						}
						if(data.unit){
							console.log(data.unit)
							$("#unit").val(data.unit)
						}
						if(data.culture){
							$("#culture").val(data.culture)
						}
						if(data.sex=="男"){
							$(".sex-circle").eq(0).addClass("sex-circle-active")
						}else{
							$(".sex-circle").eq(1).addClass("sex-circle-active")
						}
					}
					
				}
			},
			error:function(){}
		});
	}
	$("#next").click(function(){
		bindIdentity(userId)
	})
	$(".sex-circle").click(function(){
		$(".sex-circle").removeClass("sex-circle-active")
		$(this).addClass("sex-circle-active")
	})
	getUserInfo(userId)
	function bindIdentity(userId){
		var name = $("#name").val();
		var idType = $("#idType").val();
		var idNumber = $("#idNumber").val();
		var typeStr;

		if(idType==1){
			typeStr="身份证"
		}else if(idType==2){
			typeStr="护照"
		}else if(idType==3){
			typeStr="军官证"
		}else if(idType==4){
			typeStr="驾照"
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/bindIdentity.json",
			data:{
				"userId":userId,
				"name":name,
				"idType":idType,
				"idNumber":idNumber
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					
					$("#name2").html(name);
					$("#idType2").html(typeStr);
					$("#idNumber2").html(idNumber);
					$(".section-container1").hide();
					$(".section-container2").show();
					
				}
			},
			error:function(){}
		});
	}
	$("#change-submit").click(function(){
		updatePass(userId)
	})
	function updatePass(userId){
		var oldpassword = $("#oldpassword").val();
		if(oldpassword){
			$("#login-tip1").html("请输入密码")
		}
		var newpassword = $("#change-password1").val();
		if(!newpassword){
			$("#login-tip2").html("请输入密码")
		}
		var newpassword2 = $("#change-password2").val();
		if(!newpassword2){
			$("#login-tip3").html("请输入密码")
		}
		$.ajax({
			type:"post",
			url:url_path+"/user/updatePassword.json",
			data:{
				"userId":userId,
				"oldpassword":oldpassword,
				"newpassword":newpassword
			},
			dataType:"json",
			success:function(data){
				if(data.msg=="成功"){
					history.go(-1);
				}else{
					$("#login-tip4").html(data.msg)
				}
			},
			error:function(){}
		});
	}
	$("#modifyUserInfo").click(function(){
		modifyUserInfo(userId)
	})
	function modifyUserInfo(userId){
		var sex = $(".sex-circle-active").data("sexid");
		var sexstr;
		if(sex==0){
			sexstr="男"
		}else{
			sexstr="女"
		}
		var bornDate = $("#bornDate").val();
		var national = $("#national").val();
		var unit = $("#unit").val();
		var culture = $("#culture").val();
		var professional = $("#professional").val();
		var positionalTitle =$("#positionalTitle").val();
		var address = $("#address").val();
		var fixedTel = $("#fixedTel").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		
		var dataArray = {};
		if(sex){
			dataArray.sex = sexstr
		}
		if(bornDate){
			dataArray.bornDate = bornDate
		}
		if(national){
			dataArray.national = national
		}
		if(unit){
			dataArray.unit = unit
		}
		if(culture){
			dataArray.culture = culture
		}
		if(professional){
			dataArray.professional = professional
		}
		if(positionalTitle){
			dataArray.positionalTitle = positionalTitle
		}
		if(address){
			dataArray.address = address
		}
		if(fixedTel){
			dataArray.fixedTel = fixedTel
		}
		if(phone){
			dataArray.phone = phone
		}
		if(email){
			dataArray.email = email
		}
		dataArray.userId = userId;
		
		$.ajax({
			type:"post",
			url:url_path+"/user/modifyPersonalInfo.json",
			data:dataArray,
			dataType:"json",
			success:function(data){
			
				if(data.msg=="成功"){
					alert("修改成功")
					window.location.href="personal-info.html"
				}
			},
			error:function(xml){
				console.log(xml)
			}
		});
	}
})