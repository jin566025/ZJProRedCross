$(function(){
	var pageNo = 1;
	var pageSize = 5;

	$('#totalPage').on('DOMNodeInserted',function(){
		var totalSize = parseInt($('#totalPage').text());
        var totalPage = Math.ceil(totalSize/pageSize);
        $("#page").paging({
			pageNo:pageNo,
			totalPage: totalPage,
			totalSize: totalSize,
			callback: function(pageNo) {
				var trainType = $(".content-left-nav-active").data("typeid");
				getTrainPlanList(trainType,pageNo,pageSize);
			}
		})
    })
	$("#area").click(function(){
		$.ajax({
			type:"post",
			url:url_path+"/redcross/getAreaList.json",
			data:{
				"parentId":11,
				"deep":2
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				$(".city").html("");
				if($(".areas").hasClass("opened")){
					$(".areas").removeClass("opened").fadeOut(500)
				}else{
					$(".areas").addClass("opened").fadeIn(500)
					var list = data.areaList;
					for(var i=0;i<list.length;i++){
						var html =  '<div class="cities" data-cityid='+list[i].id+'>'+list[i].area+'</div>';
						$(".city").append(html)			
					}
				}
			},
			error:function(xml){
				console.log(xml)
			}
		});
	})

	$(".city").on("click",".cities",function(){
		var cityId = $(this).data("cityid");
		$("#trainAreaId").attr("data-trainAreaId",cityId);
		$(".cities").removeClass("city-active");
		$(this).addClass("city-active");
		$.ajax({
			type:"post",
			url:url_path+"/redcross/getAreaList.json",
			data:{
				"parentId":cityId,
				"deep":3
			},
			dataType:"json",
			success:function(data){
				$('.qu').html("");
				$(".city").css("border-bottom","1px solid gray");
				$(".qu").fadeIn(500);
				console.log(data)
				var list = data.areaList;
				for(var i=0;i<list.length;i++){
					var html = '<div class="qus" data-areaid='+list[i].id+'>'+list[i].area+'</div>';
					$('.qu').append(html)
				}
				var html2 = '<div class="finish-btn clearfix"><div class="fr finish">确定</div></div>'
				$('.qu').append(html2)
			},
			error:function(xml){
				console.log(xml)
			}
		});
	})
	$(".main").on("click",".classes",function(){
		
		var main = $(this);
		var btn = main.find(".btn");
		
			
		var classid = main.data("classid");
		var class_name = main.find(".class-name").text();
		var class_type = main.find(".class-type").text();
		var Singup = main.find(".Singup").text();
		var class_time = main.find(".class-time").text();
		var class_address = main.find(".class-address").text();
		var class_teacher = main.find(".class-teacher").text();
		var type_id = main.find(".class-type").data("type")
		var classarray = {};
		classarray.classid = classid;
		classarray.type_id = type_id;
		classarray.class_name = class_name;
		classarray.class_type = class_type;
		classarray.Singup = Singup;
		classarray.class_time = class_time;
		classarray.class_address = class_address;
		classarray.class_teacher = class_teacher;
		classarray.class_teacher = class_teacher;
		classarray = JSON.stringify(classarray);
		sessionStorage.setItem("classarray",classarray);
		setTimeout(function(){
			window.location.href="index-detail.html"
		},500)
			
		
		
	})

	function getTrainPlanList(trainType,pageNo,pageSize){
		var trainAreaId = $("#trainAreaId").attr("data-trainAreaId");
		var trainStart = $("#dpd1").val();
		var trainEnd = $("#dpd2").val();
		
		var dataArray = {};
		if(trainType){
			dataArray.trainType = trainType;
		}
		if(trainAreaId){
			dataArray.trainAreaId = trainAreaId;
		}
		if(trainStart && !trainStart==NaN){
			trainStart = trainStart + " 00:00:00";
			trainStart = new Date(trainStart);
			trainStart = trainStart.getTime();
			dataArray.trainStart = trainStart;
		}
		if(trainEnd && !trainEnd==NaN){
			trainEnd = trainEnd + " 00:00:00";
			trainEnd = new Date(trainEnd);
			trainEnd = trainEnd.getTime();
			dataArray.trainEnd = trainEnd;
		}
		if(redUserId){
			dataArray.redUserId = redUserId;
		}
		
		dataArray.pageNo = pageNo;
		dataArray.pageSize = pageSize;
		console.log(dataArray)
		$.ajax({
			type:"post",
			url:url_path+"/plan/getTrainPlanList.json",
			data:dataArray,
			dataType:"json",
			success:function(data){
				console.log(data)
				$(".class-container").html("");
				if(data.msg=="成功"){
					$(".fenye").show();
					var totalPage =parseInt($('#totalPage').text());
					if(totalPage!==data.totalCount){
						$('#totalPage').html(data.totalCount);
					}
					
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
							state_str = "审核通过";
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
						var directional = list[i].directional;
						if(directional){
							state_cls = "btn-state4"
						}
						var html = '<div class="classes" data-classId='+list[i].id+'>'+
										'<p class="class-teacher hide">'+list[i].teacher+'</p>'+
										'<p class="class-title">'+
											'<a>【</a>'+
											'<a>'+list[i].city+'</a>'+
											'<a>】</a>'+
											'<a class="class-name">'+list[i].name+'</a>'+
										'</p>'+
										'<div class="classes-section clearfix">'+
											'<div class="fl classes-sections">'+
												'<a>课程类型：</a>'+
												'<a  class="class-type" data-type='+list[i].type+'>'+type_str+'</a>'+
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
					$(".fenye").hide();
					$(".class-container").html("");
					var html = '<div class="classes"><p class="nolist">暂无培训计划</p></div>';
					$(".class-container").append(html);
				}
				
			},
			error:function(){}
		});
	}
	
	
	
	$(".search").click(function(){
		getTrainPlanList("",pageNo,pageSize);
	})
	
	$(".content-left-nav").click(function(){
		var trainType = $(this).data("typeid");
		getTrainPlanList(trainType,pageNo,pageSize);
		$(".content-left-nav").removeClass("content-left-nav-active");
		$(this).addClass("content-left-nav-active")
	})
	function webload(){
		var typeId = sessionStorage.getItem("trainType2")
		console.log(typeId)
		if(typeId==0){
			getTrainPlanList("",pageNo,pageSize);
		}else{
			getTrainPlanList(typeId,pageNo,pageSize);
			
		}
		$(".content-left-nav").removeClass("content-left-nav-active");
		$(".content-left-nav").eq(typeId).addClass("content-left-nav-active")
	}
	webload()
})
