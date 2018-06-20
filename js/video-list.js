$(function(){
	var pageNo=1;
	var pageSize=10;
	$('#totalPage').on('DOMNodeInserted',function(){
		var totalSize = parseInt($('#totalPage').text());
    	var totalPage = Math.ceil(totalSize/pageSize);
        $("#page").paging({
			pageNo:pageNo,
			totalPage: totalPage,
			totalSize: totalSize,
			callback: function(pageNo) {
				var trainType = $(".content-left-nav-active").data("typeid");
				getCoursewareList(trainType,pageNo,pageSize);
			}
		})
    })
	getCoursewareList("",pageNo,pageSize);

	$(".content").on("click",".content-left-nav",function(){
		$(".content-left-nav").removeClass("content-left-nav-active");
		$(this).addClass("content-left-nav-active");
		var trainType = $(this).data("typeid");
		getCoursewareList(trainType,pageNo,pageSize);
	})
	$(".content").on("click",".video-lookup,.video-icon",function(){
		var coursewareId = $(this).parent().parent().data("id");
		var coursename = $(this).siblings(".video-type").text();
		$(".class-detail").html(coursename);
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
				console.log(data)
				
				if(data.msg=="成功"){
					var list = data.courseList;
					var list2 = data.syllabusList;
					$("#syllabusList1,#syllabusList2").html("")
					for(var i=0;i<list2.length;i++){
						var html = '<div class="syllabusname fl" data-syllabusid='+list2[i].syllabusid+'>'+list2[i].name+'</div>';
						$("#syllabusList1").append(html);
					}
					for(var j=0;j<list.length;j++){
						var num = j+1;
						var html = '<div class="coursename">'+num+"."+list[j].courseName+'</div>';
						$("#syllabusList2").append(html);
					}
				}
			},
			error:function(){}
		});
	})

	function getCoursewareList(trainType,pageNo,pageSize){
		var unitId = parseInt($("#unitId").val());
		var courseId = parseInt($("#courseId").val());
		var dataArray = {};
		if(unitId){
			dataArray.unitId = unitId;
		}
		if(courseId){
			dataArray.courseId = courseId;
		}
		if(trainType){
			dataArray.trainType = trainType;
			$(".filter").show();
		}else{
			$(".filter").hide();
		}
		if(redUserId){
			dataArray.redUserId = redUserId;
		}

		dataArray.pageNo=pageNo;
		dataArray.pageSize=pageSize;
		console.log(dataArray)
		$.ajax({
			type:"post",
			url:url_path+"/learn/getCoursewareList.json",
			data:dataArray,
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					$(".fenye").show()
					var totalPage =parseInt($('#totalPage').text());
					if(totalPage!==data.totalCount){
						$('#totalPage').html(data.totalCount);
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
				}else if(data.msg=="无数据"){
					var html = '<p class="fail">暂无学习课件</p>'
					$(".video-list").html(html);
					$(".fenye").hide()
				}
			},
			error:function(){}
		});
	}
	
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
	$(".close").click(function(){
		$("#shadow,#dialog").fadeOut(500)
	})
})
