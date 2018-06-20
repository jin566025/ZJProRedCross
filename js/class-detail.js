$(function(){
	var nav_name = sessionStorage.getItem("navactive");
	var nav_name2 = sessionStorage.getItem("navname");
	$("#nav1").html(nav_name);
	$("#nav2").html(nav_name2);
	var href = window.location.href.split("=");
	console.log(href);
	
	var totalTheoryCredit = href[3];
	var totalTheoryPeriod = href[4];
	var totalPracticalCredit = href[5];
	var totalPracticalPeriod = href[6];
	var totalTrialCredit = href[7];
	var totalTrialPeriod = href[8];
	
	$("#totalTheoryCredit").html(totalTheoryCredit);
	$("#totalTheoryPeriod").html(totalTheoryPeriod);
	$("#totalPracticalCredit").html(totalPracticalCredit);
	$("#totalPracticalPeriod").html(totalPracticalPeriod);
	$("#totalTrialCredit").html(totalTrialCredit);
	$("#totalTrialPeriod").html(totalTrialPeriod);
	
	var trainUnitId =parseInt(window.location.href.split("=")[1]);
	var dataArray = {};
	if(redUserId){
		dataArray.redUserId = redUserId
	}
	dataArray.trainUnitId = trainUnitId
	$.ajax({
		type:"post",
		url:url_path+"/learn/getTrainUnitCourseList.json",
		data:dataArray,
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.msg=="成功"){
				var practicalList = data.practicalList;
				var theoryList = data.theoryList;
				var trialList = data.trialList;
				//实操课程列表
				if(!practicalList[0]){
					$("#content2").hide();
				}else{
					for(var i=0;i<practicalList.length;i++){
						
						var cls;
						if(practicalList[i].coursePeriod){
							cls=""
						}else{
							cls="hides"
						}
						
						var type_str;
						var typecls;
						if(practicalList[i].islearned==false){
							type_str="未学";
							typecls="types1"
						}else{
							type_str="已学";
							typecls="types2"
						}
						var html = '<div class="class-detail-lists clearfix">'+
										'<div class="class-detail-lists-left fl">'+practicalList[i].courseName+'</div>'+
										'<div class="class-detail-lists-right fl '+cls+'">'+
											'<a>学时：</a>'+
											'<a>'+practicalList[i].coursePeriod+'</a>'+
										'</div>'+
										'<div class="types fr '+typecls+'">'+type_str+'</div>'+
									'</div>';
						$("#content2-list").append(html);
					}
				}
				
				//理论课程列表
				if(!theoryList[0]){
					$("#content1").hide();
				}else{
					for(var i=0;i<theoryList.length;i++){
						
						var cls;
						if(theoryList[i].coursePeriod){
							cls=""
						}else{
							cls="hides"
						}
						
						var type_str;
						var typecls;
						if(theoryList[i].islearned==false){
							type_str="未学";
							typecls="types1"
						}else{
							type_str="已学";
							typecls="types2"
						}
						var html = '<div class="class-detail-lists clearfix">'+
										'<div class="class-detail-lists-left fl">'+theoryList[i].courseName+'</div>'+
										'<div class="class-detail-lists-right fl '+cls+'">'+
											'<a>学时：</a>'+
											'<a>'+theoryList[i].coursePeriod+'</a>'+
										'</div>'+
										'<div class="types fr '+typecls+'">'+type_str+'</div>'+
									'</div>';
						$("#content1-list").append(html);
					}
				}
				//	试讲课程列表
				if(!trialList[0]){
					$("#content3").hide();
				}else{
					for(var i=0;i<trialList.length;i++){
						
						var cls;
						if(trialList[i].coursePeriod){
							cls=""
						}else{
							cls="hides"
						}
						
						var type_str;
						var typecls;
						if(trialList[i].islearned==false){
							type_str="未学";
							typecls="types1"
						}else{
							type_str="已学";
							typecls="types2"
						}
						var html = '<div class="class-detail-lists clearfix">'+
										'<div class="class-detail-lists-left fl">'+trialList[i].courseName+'</div>'+
										'<div class="class-detail-lists-right fl '+cls+'">'+
											'<a>学时：</a>'+
											'<a>'+trialList[i].coursePeriod+'</a>'+
										'</div>'+
										'<div class="types fr '+typecls+'">'+type_str+'</div>'+
									'</div>';
						$("#content3-list").append(html);
					}
				}
				if(href[2]==1){
					$(".enroll-content-title").html("必修")
					$(".hides").css("display","none");
				}else{
					$(".enroll-content-title").html("选修")
				}
			}
			
			
			
		},
		error:function(){}
	});
})
