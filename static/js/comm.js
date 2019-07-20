$(function(){
	//加载头部
	 
		$(".ssubNav .navline").click(function(){
			if($("#mobileNav").css("display")=="none")
			{
				$("#navline_1").addClass("navline1");
				$("#navline_2").addClass("navline2");
				$("#navline_3").addClass("navline3");
			}else{
				$("#navline_1").removeClass("navline1");
				$("#navline_2").removeClass("navline2");
				$("#navline_3").removeClass("navline3");
			}
			$("#mobileNav").toggle(300);
		});
		$(".header .nav #nav li").hover(function(){
			$(this).children("ul").slideDown(200);
			},
			function(){
				$(this).children("ul").slideUp(200);
			}
		);

	//加载尾部
	$.get("./seg/footer.seg",function(data){
		$("footer").html(data);
	},"html");	
	
	//加载右部
	//$.get("./seg/right.seg",function(data){
	//	$("#right_col").html(data);
	//},"html");
	gotoTop();
});

function gotoTop(min_height){
    //预定义返回顶部的html代码，它的css样式默认为不显示
    var gotoTop_html = '<div id="gotoTop"><i class="fa fa-angle-up fa-2x"></i></div>';
    //将返回顶部的html代码插入页面尾部元素前 
    $(gotoTop_html).insertBefore(".footer");
    $("#gotoTop").click(//定义返回顶部点击向上滚动的动画
        function(){$('html,body').animate({scrollTop:0},700);
    }).hover(//为返回顶部增加鼠标进入的反馈效果，用添加删除css类实现
        function(){$(this).addClass("hover");},
        function(){$(this).removeClass("hover");
    });
    //获取页面的最小高度，无传入值则默认为600像素
    min_height ? min_height = min_height : min_height = 600;
    //为窗口的scroll事件绑定处理函数
    $(window).scroll(function(){
        //获取窗口的滚动条的垂直位置
        var s = $(window).scrollTop();
        //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
        if( s > min_height){
            $("#gotoTop").fadeIn(100);
        }else{
            $("#gotoTop").fadeOut(200);
        };
    });
}