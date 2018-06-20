$(function(){
	var nowTemp = new Date();
	var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	var checkin = $('#dpd1').fdatepicker({
		onRender: function (date) {
			return date.valueOf() < now.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		if (ev.date.valueOf() > checkout.date.valueOf()) {
			var newDate = new Date(ev.date)
			newDate.setDate(newDate.getDate() + 1);
			checkout.update(newDate);
		}
		checkin.hide();
		$('#dpd2')[0].focus();
	}).data('datepicker');
	var checkout = $('#dpd2').fdatepicker({
		onRender: function (date) {
			return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
		}
	}).on('changeDate', function (ev) {
		checkout.hide();
	}).data('datepicker');
	

	$(".areas").on("click",".qus",function(){
		$(".qus").removeClass("city-active");
		$(this).addClass("city-active");
		var areaid = $(this).data("areaid");
		$("#trainAreaId").attr("data-trainAreaId",areaid);
	})

	$(".areas").on("click",".finish",function(){
		var city_active = $(".city-active");
		var str = "";
		for(var i=0;i<city_active.length;i++){
			str += $(city_active[i]).text();
		}
		$("#area").val(str)
		$(".areas").removeClass("opened").fadeOut(500)
	})

})