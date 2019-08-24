var rand=0;
var iCntr=0;
var win_width = 0;
var startX=0;
var moveX=0;
var isMouseMove=false;
$(document).ready(function() {
	rand = 1;//Math.ceil(Math.random()*6);
	slideChange(rand);
	$('.sliderContainer .slideSelectors .item').click(function(){
		clearInterval(iCntr);
		var i = $(this).index();
		slideChange(i);
	});
	$('.sliderContainer .slideSelectors .prev').click(function(){
		clearInterval(iCntr);
		var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
		if(i>=1){
			slideChange(i);
		}
		else{
			i=6;
			slideChange(i);
		}
	});
	$('.sliderContainer .slideSelectors .next').click(function(){
		clearInterval(iCntr);
		var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
		if(i<=4){
			slideChange(i+2);
		}
		else{
			i=1;
			slideChange(i);
		}
	});
	$('.sliderContainer .slider .item').mousedown(function(e) {
		e.preventDefault();
		startX=e.pageX;
		isMouseMove=false;
		$('.sliderContainer .slider .item a').unbind("click");
	});
	$('.sliderContainer .slider .item').mousemove(function(e) {
		isMouseMove=true;
		$('.sliderContainer .slider .item a').bind("click",function(){return false});
	});
	$('.sliderContainer .slider .item').mouseup(function(e) {
		if(isMouseMove===true){
			e.preventDefault();
			var pageX = e.pageX;
			if(pageX>startX){
				clearInterval(iCntr);
				var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
				if(i>=1){
					slideChange(i);
				}
				else{
					i=6;
					slideChange(i);
				}
			}
			else{
				clearInterval(iCntr);
				var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
				if(i<=4){
					slideChange(i+2);
				}
				else{
					i=1;
					slideChange(i);
				}
			}
			startX=0;
			isMouseMove=false;
		}
	});
	$('.sliderContainer .slider .item').on("touchstart",function(e) {
		if(e.originalEvent.touches.length>0)
			startX=e.originalEvent.touches[0].pageX;
		isMouseMove=false;
		$('.sliderContainer .slider .item a').unbind("tap");
	});
	$('.sliderContainer .slider .item').on("touchmove",function(e) {
		isMouseMove=true;
		if(e.originalEvent.touches.length>0)
			moveX=e.originalEvent.touches[0].pageX;
		$('.sliderContainer .slider .item a').bind("tap",function(){return false});
	});
	$('.sliderContainer .slider .item').on("touchend",function(e) {
		if(isMouseMove===true){
			e.preventDefault();
			var pageX = 0;
			if(e.originalEvent.touches.length>0)
				pageX = e.originalEvent.touches[0].pageX;
			else 
				pageX = moveX;
			if(pageX>startX){
				clearInterval(iCntr);
				var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
				if(i>=1){
					slideChange(i);
				}
				else{
					i=6;
					slideChange(i);
				}
			}
			else{
				clearInterval(iCntr);
				var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
				if(i<=4){
					slideChange(i+2);
				}
				else{
					i=1;
					slideChange(i);
				}
			}
			startX=0;
			moveX=0;
			isMouseMove=false;
		}
	});
	 iCntr=setInterval(slideNext,8000);
	
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
$(document).keydown(function(e) {
	switch(e.keyCode) {
							
		case 37:
			
			clearInterval(iCntr);
			var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
			if(i>=1){
				slideChange(i);
			}
			else{
				i=6;
				slideChange(i);
			}
		break;
		
		case 39:
			
			clearInterval(iCntr);
			var i = $('.sliderContainer .slideSelectors .item').index($('.sliderContainer .slideSelectors .selected'));
			if(i<=4){
				slideChange(i+2);
			}
			else{
				i=1;
				slideChange(i);
			}
			
		break;
		
	}
});

function slideChange(args) {
	/*$('.sliderContainer .slideSelectors .item').removeClass('selected');
	$('.sliderContainer .slideSelectors .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
	*/
	$('.sliderContainer .slider .item').fadeOut(600,"linear");
	setTimeout(function(){
		$('.sliderContainer .slider .item:eq(' + (args- 1) + ')').fadeIn(1200,"easeInSine");
		$('.sliderContainer .slideSelectors .item').removeClass('selected');
		$('.sliderContainer .slideSelectors .item:eq(' + (args- 1) + ')').addClass('selected');
		setTimeout(function(){
			sliderLoaded(args);
		},1000);
	},600);
	
}
function sliderLoaded(args) {
	/*
	$(args.sliderObject).find('.text1, .text2').attr('style', '');

	$(args.currentSlideObject).find('.text1').animate({
		left: '80px',
		opacity: '0.8'
	},1500, 'easeOutQuint');

	$(args.currentSlideObject).find('.text2').delay(100).animate({
		left: '80px',
		opacity: '0.8'
	},1500, 'easeOutQuint');
	
	slideChange(args);
	*/
	$(".sliderContainer .slider .item").find('.text1-bg,.text1, .text2').attr('style', '');
	var w = $('.sliderContainer .slider .item:eq(' + (args- 1) + ') .text1').width();
	$('.sliderContainer .slider .item:eq(' + (args- 1) + ')').find('.text1-bg').animate({
		left: '100px',
		opacity: '0.4',
		width:w
	},800, 'easeOutQuint');
	$('.sliderContainer .slider .item:eq(' + (args- 1) + ')').find('.text1').animate({
		left: '100px',
		opacity: '1'
	},1500, 'easeOutQuint');

	$('.sliderContainer .slider .item:eq(' + (args- 1) + ')').find('.text2').delay(100).animate({
		left: '100px',
		opacity: '0.8'
	},1500, 'easeOutQuint');
}

function slideNext(){
	rand = rand%6+1;
	slideChange(rand);
}

function adjustWidth()
{
	var new_height = win_width / 3;
	if (new_height > 380)
	{
		new_height = 380;
	}
	$(".iosSliderDemo").css("padding-bottom", new_height);
	$(".fluidHeight").height(new_height);
	$(".sliderContainer").css("max-height", new_height);
	var favH = $(".fav-link").height();
	$(".fav-link").css("top",(new_height-favH)/2);
	if(win_width<420){
		$(".iosSliderDemo .paste-item").css("right",0);
		$(".iosSliderDemo .paste-item").css("width",win_width);
		$(".iosSliderDemo .paste-item .input-item").css("width",win_width-20);
	   $(".iosSliderDemo .paste-item .btn-item").css("width",win_width-20);
	   $(".iosSliderDemo .paste-item .btn-item-part").css("width",(win_width-20)/2-3);
	   $(".iosSliderDemo .paste-item  p .s-blk").css("width",(win_width-20)/2);
	}
	else{
		$(".iosSliderDemo .paste-item").css("right",75);
		$(".iosSliderDemo .paste-item").css("width",320);
		$(".iosSliderDemo .paste-item .input-item").css("width",300);
	   $(".iosSliderDemo .paste-item .btn-item").css("width",300);
	   $(".iosSliderDemo .paste-item .btn-item-part").css("width",147);
	   $(".iosSliderDemo .paste-item  p .s-blk").css("width",150);
	}
}