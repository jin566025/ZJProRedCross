$(function(){
//	var navindex =parseInt(sessionStorage.getItem("navindex"));
//	console.log(navindex)
//	if(navindex){
//		getTrainUnitList(navindex)
//		$(".content-left-nav").eq(navindex).add
//	}else{
//		getTrainUnitList(1)
//	}
	getTrainUnitList(1)
	$(".content-left-nav").click(function(){
		$(".content-left-nav").removeClass("content-left-nav-active");
		$(this).addClass("content-left-nav-active");
		
		var trainType = $(this).data("typeid");
		getTrainUnitList(trainType)
	})
	function getTrainUnitList(trainType){
		$.ajax({
			type:"post",
			url:url_path+"/learn/getTrainUnitList.json",
			data:{
				"trainType":trainType
			},
			dataType:"json",
			success:function(data){
				console.log(data)
				if(data.msg=="成功"){
					$(".class-list").html("");
					var html2 = '<tr class="class-list-tr">'+
									'<td id="td1" class="td1">单元名称</td>'+
									'<td id="td2" class="td2">选修/必修</td>'+
									'<td id="td3" class="td2">理论学时</td>'+
									'<td id="td4" class="td2">实操学时</td>'+
									'<td id="td5" class="td2">试讲学时</td>'+
								'</tr>';
					$(".class-list").append(html2);
					var list = data.unitList;
					for(var i=0;i<list.length;i++){
						var typeStr;
						if(list[i].type==1){
							typeStr = "必修"
						}else{
							typeStr = "选修"
						}
						
						html = '<tr class="class-list-tr" data-trainUnitId='+list[i].trainUnitId+'>'+
									'<td class="td1 tds1">'+list[i].unitName+'</td>'+
									'<td class="td2 tds2" data-type='+list[i].type+'>'+typeStr+'</td>'+
									'<td class="td2 tds3" data-totalTheoryCredit='+list[i].totalTheoryCredit+'>'+list[i].totalTheoryPeriod+'</td>'+
									'<td class="td2 tds4" data-totalPracticalCredit='+list[i].totalPracticalCredit+'>'+list[i].totalPracticalPeriod+'</td>'+
									'<td class="td2 tds5" data-totalTrialCredit='+list[i].totalTrialCredit+'>'+list[i].totalTrialPeriod+'</td>'+
								'</tr>';
						$(".class-list").append(html);
					}
					
					if(trainType==1){
						$("#td4,#td5,.tds4,.tds5").hide();
					}else if(trainType==2 || trainType==3){
						$("#td5,.tds5").hide();
					}
				}else if(data.msg=="无数据"){
					$(".class-list").html("");
					var html = '<tr class="class-list-tr">'+
									'<td id="td1" class="td1">单元名称</td>'+
									'<td id="td2" class="td2">选修/必修</td>'+
									'<td id="td3" class="td2">理论学时</td>'+
									'<td id="td4" class="td2">实操学时</td>'+
									'<td id="td5" class="td2">试讲学时</td>'+
								'</tr>'+
								'<tr class="class-list-tr">'+
									'<td class="td1 tds1">无数据</td>'+
									'<td class="td2 tds2">无数据</td>'+
									'<td class="td2 tds3">无数据</td>'+
									'<td class="td2 tds4">无数据</td>'+
									'<td class="td2 tds5">无数据</td>'+
								'</tr>';
					$(".class-list").append(html);
				}
			},
			error:function(){}
		});
	}
	$(".main").on("click",".class-list-tr",function(){
		var nav_active = $(".content-left-nav-active").text();
		var nav_name = $(this).find(".tds1").text();
		var nav_index = $(".content-left-nav-active").data("typeid");
		
		var type = $(this).find(".tds2").attr("data-type");
		var totalTheoryCredit = $(this).find(".tds3").attr("data-totalTheoryCredit");
		var totalTheoryPeriod = parseInt($(this).find(".tds3").text());
		var totalPracticalCredit = $(this).find(".tds4").attr("data-totalPracticalCredit");
		var totalPracticalPeriod = parseInt($(this).find(".tds4").text());
		var totalTrialCredit = $(this).find(".tds5").attr("data-totalTrialCredit");
		var totalTrialPeriod = parseInt($(this).find(".tds5").text());
		
		sessionStorage.setItem("navactive",nav_active);
		sessionStorage.setItem("navname",nav_name);
		sessionStorage.setItem("navindex",nav_index);
		var trainUnitId = $(this).attr("data-trainUnitId");
		setTimeout(function(){
			window.location.href="class-detail.html?trainUnitId="+trainUnitId+"="+type+"="+totalTheoryCredit+"="+totalTheoryPeriod+"="+totalPracticalCredit+"="+totalPracticalPeriod+"="+totalTrialCredit+"="+totalTrialPeriod;
		},500)
	})

})
