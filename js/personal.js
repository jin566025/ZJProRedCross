function upimg(t){
	var r = new FileReader();
	f = t.files[0];
	r.readAsDataURL(f);
	r.onload = function(e){
		$("#imageUrl").attr("src",e.target.result)
	}
}
$(function(){
	$("#userId").val(userId);
	var pageNo = 1;
	var pageSize = 10;
	$('#totalPage').on('DOMNodeInserted',function(){
		var totalSize = parseInt($('#totalPage').text());
        var totalPage = Math.ceil(totalSize/pageSize);
        $("#page").paging({
			pageNo:pageNo,
			totalPage: totalPage,
			totalSize: totalSize,
			callback: function(pageNo) {
				getUserTrainplanList(pageNo,pageSize,redUserId)
			}
		})
    })
	
	$('#totalPage2').on('DOMNodeInserted',function(){
		var totalPage2 = parseInt($('#totalPage2').text());
        var totalSize2 = totalPage2*pageSize;     
        $("#page2").paging({
			pageNo:pageNo,
			totalPage: totalPage2,
			totalSize: totalSize2,
			callback: function(pageNo) {
				getUserTrainplanList(pageNo,pageSize,redUserId)
			}
		})
    })
	getUserTrainplanList(pageNo,pageSize,redUserId)
	$(".content-right-nav").click(function(){
		
		var nav_index = $(this).index();
		if($(this).hasClass("content-right-nav-active")){
			
		}else{
			$(".content-right-nav").removeClass("content-right-nav-active")
			$(this).addClass("content-right-nav-active");
			$(".nav-content").hide();
			$(".nav-content").eq(nav_index).show()
			if(nav_index==1){
				$(".fenye").hide();
				$(".fenye2").show();
				getCoursewareList(pageNo,pageSize,redUserId)
			}else{
				$(".fenye2").hide();
				$(".fenye").show();
			}

		}
	})
	
	$(".content").on("click",".btn-state1",function(){
		var main = $(this).parent().parent();
		var classid = main.data("classid");
		var class_name = main.find(".class-name").text();
		var class_type = main.find(".class-type").text();
		var Singup = main.find(".Singup").text();
		var class_time = main.find(".class-time").text();
		var class_address = main.find(".class-address").text();
		var class_teacher = main.find(".class-teacher").text();
		var classarray = {};
		classarray.classid = classid;
		classarray.class_name = class_name;
		classarray.class_type = class_type;
		classarray.Singup = Singup;
		classarray.class_time = class_time;
		classarray.class_address = class_address;
		classarray.class_teacher = class_teacher;
		classarray.class_teacher = class_teacher;
		classarray = JSON.stringify(classarray);
		sessionStorage.setItem("classarray2",classarray);
		setTimeout(function(){
			window.location.href="personal-info-detail.html"
		},500)
	})
	$(".content").on("click",".video-lookup,.video-icon",function(){
		var coursewareId = $(this).parent().parent().data("id");
		$("#shadow,#dialog").fadeIn(500);
		$.ajax({
			type:"post",
			url:url_path+"/learn/getCoursewareCourseList.json",
			data:{
				"coursewareId":coursewareId,
				"redUserId":redUserId
			},
			dataType:"json",
			success:function(data){
				var list = data.courseList;
				if(data.msg=="成功"){
					$(".class-detail-content").html("")
					for(var i=0;i<list.length;i++){
						var type_str,type_cls;
						if(list[i].isLearned){
							type_str = "已学"
						}else{
							type_str = "未学"
						}
						var j = i+1;
						var html = '<div class="class-detail-content2 clearfix">'+
										'<div class="class-detail-content-left fl clearfix">'+
											'<div class="type type1 fr">'+type_str+'</div>'+
										'</div>'+
										'<div class="class-detail-content-right fl clearfix">'+
											'<p>'+j+'.'+list[i].courseName+'</p>'+
										'</div>'+
									'</div>';
						$(".class-detail-content").append(html);
					}
				}
			},
			error:function(){}
		});
	})
	$(".close").click(function(){
		$("#shadow,#dialog").fadeOut(500)
	})
	$(".main").on("click",".video-play",function(){
		var main = $(this).parent().parent()
		var video_url2 = main.find(".video-url").text();
		var coursewareId2 = main.data("id");
		var video_unit = main.find(".video-unit").text();
		var video_name = main.find(".video-title").text();
		var video_type = main.find(".video-type").text();
		sessionStorage.setItem("video_unit",video_unit);
		sessionStorage.setItem("video_name",video_name);
		sessionStorage.setItem("video_type",video_type);
		setTimeout(function(){
			window.location.href = "video-player.html?url="+video_url2+"="+coursewareId2;
		},500)
		
	})

	function getUserTrainplanList(pageNo,pageSize,redUserId){
		var dataArray = {};
		dataArray.redUserId = redUserId;
		dataArray.pageNo=pageNo;
		dataArray.pageSize=pageSize;
		$.ajax({
			type:"post",
			url:url_path+"/plan/getUserTrainplanList.json",
			data:dataArray,
			dataType:"json",
			success:function(data){
				
				if(data.msg=="成功"){
					var totalPage =parseInt($('#totalPage').text());
					if(totalPage!==data.totalCount){
						$('#totalPage').html(data.totalCount);
					}
					$(".class-container").html("");
					var list = data.trainPlanList;
					for(var i=0;i<list.length;i++){

						var type_str,state_str,state_cls;
						if(list[i].type=="1"){
							type_str = "专题培训(讲座)"
						}else if(list[i].type=="2"){
							type_str = "救护员初训"
						}else if(list[i].type=="3"){
							type_str = "救护员复训"
						}else if(list[i].type=="4"){
							type_str = "二级救护师初训"
						}else if(list[i].type=="5"){
							type_str = "二级救护师复训"
						}else if(list[i].type=="6"){
							type_str = "三级救护师初训"
						}else if(list[i].type=="7"){
							type_str = "三级救护师复训"
						}else if(list[i].type=="8"){
							type_str = "骨干班"
						}else if(list[i].type=="9"){
							type_str = "AHA培训"
						}
						
						if(list[i].signupState==0){
							state_str = "等待审核";
							state_cls = "btn-state2"
						}else if(list[i].signupState==1){
							state_str = "进行中";
							state_cls = "btn-state1"
						}else if(list[i].signupState==2){
							state_str = "审核被拒";
							state_cls = "btn-state3"
						}else if(list[i].signupState==3 && list[i].alreadySingup>=list[i].allowedSingup){
							state_str = "人数已满";
							state_cls = "btn-state3"
						}else if(list[i].signupState==3 && list[i].alreadySingup<list[i].allowedSingup){
							state_str = "报名";
							state_cls = "btn-state1"
						}
						var html = '<div class="classes" data-classId='+list[i].id+'>'+
										'<p class="class-teacher hide">'+list[i].teacher+'</p>'+
										'<p class="class-title">'+
											'<a>【</a>'+
											'<a>'+list[i].city+'省红会</a>'+
											'<a>】</a>'+
											'<a class="class-name">'+list[i].name+'</a>'+
										'</p>'+
										'<div class="classes-section clearfix">'+
											'<div class="fl classes-sections">'+
												'<a>课程类型：</a>'+
												'<a  class="class-type">'+type_str+'</a>'+
											'</div>'+
											'<div class="fl classes-sections">'+
												'<a>报名人数：</a>'+
												'<a class="Singup">'+list[i].alreadySingup+' / '+list[i].allowedSingup+'</a>'+
											'</div>'+
										'</div>'+
										'<div class="classes-section clearfix">'+
											'<div class="fl classes-sections">'+
												'<a>报名时间：</a>'+
												'<a class="class-time">'+list[i].startTime+' - '+list[i].endTime+'</a>'+
											'</div>'+
											'<div class="fl classes-sections">'+
												'<a>培训地点：</a>'+
												'<a class="class-address">'+list[i].province+list[i].city+list[i].district+list[i].address+'</a>'+
											'</div>'+
										'</div>'+
										'<div class="classes-section clearfix">'+
											'<div class="fr btn '+state_cls+'">'+state_str+'</div>'+
										'</div>'+
									'</div>';
						$(".class-container").append(html);
					}
					
				}else if(data.msg=="无数据"){
					$(".class-container").html("");
					var html = '<div class="classes"><p class="nolist">暂无培训计划</p></div>';
					$(".class-container").append(html);
				}else if(data.msg=="参数不能为NULL或空"){
					var html = '<p class="fail"><a href="login.html">请先登录</a></p>'
					$(".class-container").html(html);
				}
			},
			error:function(){}
		});
	}
	function getCoursewareList(pageNo,pageSize,redUserId){	
		var dataArray = {};
		dataArray.redUserId = redUserId;
		dataArray.pageNo=pageNo;
		dataArray.pageSize=pageSize;
		$.ajax({
			type:"post",
			url:url_path+"/user/getMyCourse.json",
			data:dataArray,
			dataType:"json",
			success:function(data){
				
				if(data.msg=="成功"){
					var totalPage =parseInt($('#totalPage2').text());
					if(totalPage!==data.totalCount){
						$('#totalPage2').html(data.totalCount);
					}
					$(".video-list").html("");
					var list = data.coursewareList;
					for(var i=0;i<list.length;i++){
						
						var type_str;
						if(list[i].trainType=="1"){
							type_str = "专题培训(讲座)"
						}else if(list[i].trainType=="2"){
							type_str = "救护员初训"
						}else if(list[i].trainType=="3"){
							type_str = "救护员复训"
						}else if(list[i].trainType=="4"){
							type_str = "二级救护师初训"
						}else if(list[i].trainType=="5"){
							type_str = "二级救护师复训"
						}else if(list[i].trainType=="6"){
							type_str = "三级救护师初训"
						}else if(list[i].trainType=="7"){
							type_str = "三级救护师复训"
						}else if(list[i].trainType=="8"){
							type_str = "骨干班"
						}else if(list[i].trainType=="9"){
							type_str = "AHA培训"
						}
						
						var unit_str;
						if(list[i].type==1){
							unit_str = "救护概论"
						}else if(list[i].type==2){
							unit_str = "心肺复苏"
						}else if(list[i].type==3){
							unit_str = "创伤救护"
						}else if(list[i].type==4){
							unit_str = "常见急症"
						}
						

						var isLearned_str;
						if(list[i].isLearned){
							isLearned_str="已学"
							isLearned_cls = "isLearned2"
						}else{
							isLearned_str="学习中";
							isLearned_cls = "isLearned1"
							
						}

						var html = '<div class="video-lists fl" data-id = '+list[i].id+'>'+
										'<div class="isLearned0 '+isLearned_cls+'">'+isLearned_str+'</div>'+
										'<p class="video-url">'+list[i].videoUrl+'</p>'+
										'<p class="video-unit">'+list[i].unit+'</p>'+
										'<div class="video-shadow">'+
											'<img class="video-play " src="icons/play2.png" />'+
										'</div>'+
										'<video class="video-lists-left" poster="'+img_url+list[i].coverUrl+'">'+'</video>'+
										'<p class="video-title">'+list[i].name+'</p>'+
										'<div class="clearfix video-container">'+
											'<a class="fl video-type">'+list[i].unit+'</a>'+
											'<img class="fr video-icon" src="icons/to-right.png" />'+
											'<a class="fr video-lookup">查看详情</a>'+
										'</div>'+
									'</div>';
						$(".video-list").append(html);
					}
				}else if(data.msg=="失败" || data.msg=="无数据" ){
					var html = '<p class="fail">暂无学习课件</p>'
					$(".video-list").html(html);
				}else if(data.msg=="参数不能为NULL或空"){
					var html = '<p class="fail"><a href="login.html">请先登录</a></p>'
					$(".video-list").html(html);
				}
			},
			error:function(){}
		});
	}
	$("#close").click(function(){
		if($(this).hasClass("openeing")){
			fadeinDialog();
			$(this).addClass("openeing")
		}else{
			fadeoutDialog();
			$(this).removeClass("openeing")
		}
	})
	$("#send-yzm2").click(function(){
		fadeinDialog();
		$(this).addClass("openeing")
	})
	
	function fadeinDialog(){
		$("#dialog,#shadow").fadeIn(300);
	}
	function fadeoutDialog(){
		$("#dialog,#shadow").fadeOut(300);
	}
	
	
	$("#send-yzm").click(function(){

		getValidateCodeByPhone();
	})
	$(".dialog-submit").click(function(){
		checkValidateCode();
	})
	function checkValidateCode(){
		var phone = $(".phone-number").val();
		if(!checkPhone(phone)){
			alert("请输入正确的手机号");
			return false;
		}
		var yzm = $(".dialog-yzm").val();
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
				console.log(data)
				if(data.msg=="成功"){
					alert("校验成功")
					$("#phone").html(phone);
					$("#phone2").val(phone);
					fadeoutDialog()
				}else{
					$("#dialog-tip").html(data.msg)
				}
			},
			error:function(){}
		});
	}
	function getValidateCodeByPhone(){
		
		var phone = $(".phone-number").val();
		if(!checkPhone(phone)){
			alert("请输入正确的手机号");
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
						
						if(data.imageUrl){
							$("#imageUrl").attr("src",img_url+data.imageUrl)
						}
						if(data.address){
							$("#address").val(data.address)
						}
						if(data.bornDate){
							var datas = data.bornDate;

							datas = datas.substring(0,11);
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
							$("#phone").html(data.phone)
							$("#phone2").val(data.phone)
						}
						if(data.positionalTitle){
							$("#positionalTitle").val(data.positionalTitle)
						}
						if(data.professional){
							$("#professional").val(data.professional)
						}
						if(data.unit){
							$("#unit").val(data.unit)
						}
						if(data.culture){
							$("#culture").val(data.culture)
						}
						if(data.sex=="男"){
							$(".sex-circle").eq(0).addClass("sex-circle-active");
							$("#sex").val("男")
						}else{
							$(".sex-circle").eq(1).addClass("sex-circle-active");
							$("#sex").val("女")
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
		$(".sex-circle").removeClass("sex-circle-active");
		$(this).addClass("sex-circle-active");
		var sexId = $(this).data("sexid");
		if(sexId==0){
			$("#sex").val("男")
		}else{
			$("#sex").val("女")
		}
	})
	getUserInfo(userId)
	//验证护照号码
	function checkPassport(code){
	    var tip = "OK";
	    var pass= true;
	    if(!code || !/^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/.test(code)){
	        return false;
	    }

	}
	function bindIdentity(userId){
		var name = $("#name").val();
		var idType = $("#idType").val();
		var idNumber = $("#idNumber").val();
		var typeStr;
		if(!name){
			$(".info-tips1").html("请输入姓名")
			return false;
		}
		
		if(idType==1){
			typeStr="身份证"
		}else if(idType==2){
			typeStr="护照"
		}else if(idType==3){
			typeStr="军官证"
		}else if(idType==4){
			typeStr="驾照"
		}else{
			$(".info-tips2").html("请选择证件类型")
			return false;
		}
		
		if(isCardNo(idNumber)==false && idType==1){
			$(".info-tips3").html("请输入有效的身份证")
			return false;
		}else if(checkPassport(idNumber)==false && idType==2){
			$(".info-tips3").html("请输入有效的护照")
			return false;
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
				console.log(data)
				if(data.msg=="成功"){
					alert("重新登录可获取培训计划")
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
	//验证手机
	function checkPhone(str) {  
	    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
	    if (!myreg.test(str)) {  
	        return false;  
	    } else {  
	        return true;  
	    }  
	}  
	//验证电话
	function checkTel(tel){
		if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)){
			return false;
		}
	}
	//验证身份证
	function isCardNo(card)  {  
	   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
       if (reg.test(card) === false) {
         return false;
       } 
       console.log("bbbb")
	}  
	//验证邮箱
	function CheckMail(mail) {
	   var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	   if(filter.test(mail)){
	   		return true;
	   }else{
		   return false;
	   }
	}
	function checkTel(str){
	    var re = /^0\d{2,3}-?\d{7,8}$/;
	    if(re.test(str)){
		    return true;
		}else{
		    return false;
		}
	}
	function modifyUserInfo(userId){
		
		var bornDate = $("#bornDate").val();
		var national = $("#national").val();
		var unit = $("#unit").val();
		var culture = $("#culture").val();
		var professional = $("#professional").val();
		var positionalTitle =$("#positionalTitle").val();
		var address = $("#address").val();
		var fixedTel = $("#fixedTel").val();
		var phone = $("#phone").text();
		var email = $("#email").val();
		
		var imageUrl = $("#imageUrl").attr("src");
		var imgfile = document.getElementById("imageUrl-input");
//		var files = imgfile.files[0];
		var files = $("#imageUrl-input").val();
		
		
		var formData  = new FormData();
		
		
		var sex = $(".sex-circle-active").data("sexid");
		var sexstr;
		
		formData.append("userId", $('input[name="userId"]').val());
		if(sex==0 || sex==1){
			if(sex==0){
				sexstr="男"
			}else{
				sexstr="女"
			}
			formData.append("sex", $('input[name="sex"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(bornDate){
			formData.append("bornDate", $('input[name="bornDate"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		
		if(national){
			formData.append("national", $('input[name="national"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(unit){
			formData.append("unit", $('input[name="unit"]').val());
		}
		else{
			alert("请填写完整");
			return false;
		}
		if(culture){
			formData.append("culture", $('input[name="culture"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(professional){
			formData.append("professional", $('input[name="professional"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(positionalTitle){
			formData.append("positionalTitle", $('input[name="positionalTitle"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(address){
			formData.append("address", $('input[name="address"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(checkTel(fixedTel)){
			formData.append("fixedTel", $('input[name="fixedTel"]').val());
		}else{
			alert("请输入正确固定电话");
			return false;
		}
		if(phone){
			formData.append("phone", $('input[name="phone"]').val());
		}else{
			alert("请填写完整");
			return false;
		}
		
		if(CheckMail(email)){
			formData.append("email", $('input[name="email"]').val());
		}else{
			alert("请输入正确格式的邮箱");
			return false;
		}
		if(files){
			formData.append("userImg", $('input[name="userImg"]')[0].files[0]);
		}
		
		$.ajax({
			type:"post",
			url:url_path+"/user/modifyPersonalInfo.json",
			data:formData,
			dataType:"json",
			processData : false,
			contentType : false,
			async:false,
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					alert("修改成功")
					window.location.href="personal-info.html"
				}else{
					alert(data.msg)
				}
			},
			error:function(xml){
				
			}
		});
	}
})