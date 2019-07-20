var win_width = 0;
$(function(){

	$(".mobSecNav").click(function(){
			$(".mobSecNavMenu").toggle(300);
	});
	initSwapData();
	$(".leftNav .cls_swap").click(function(){
		$(".leftNav li").removeClass("current");
		$(this).parent().addClass("current");
		initSwapData();
	});
	$(".mobSecNavMenu .mobSubMenu a").click(function(){
		var swapId = $(this).parent().attr("id").substring(4);
		changeMobSwapData(swapId);
		$(".mobSecNavMenu").toggle(300);
		$(".leftNav li").removeClass("current");
		$(".leftNav #"+swapId).addClass("current");
	});
	win_width = $(window).width();
	adjustWidth();
});
$(window).resize(function() {
	_width_ = $(window).width();
	if (win_width != _width_)
	{
		win_width = _width_;
		adjustWidth();
	}
});


function adjustWidth()
{
	var new_height = win_width / 3;
	var new_height2  = win_width / 3.64;
	var new_height3  = (new_height2>380?380:new_height2)-$(".boutiCon").height();
	if(new_height3<=0)
		new_height3=0;
	new_height3=new_height3/2;
	$(".bouti-tit").css("height", (new_height2>380?380:new_height2));
	$(".boutiCon").css("top", new_height3);
	$(".boutiConBg").css("top", new_height3);
}
function initSwapData(){
	var swapId = $(".leftNav .current").attr("id");
	$(".mainContent .cls_swap_data").hide();
	$(".mainContent #"+swapId+"_data").show();
}
function changeMobSwapData(swapId){
	$(".mainContent .cls_swap_data").hide();
	$(".mainContent #"+swapId+"_data").show();
}