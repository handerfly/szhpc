/*$(function(){
	//加载头部
	$(".content .pic-squre a").hover(function(){
		$(this).children("img").fadeTo(200,0);
	},function(){
		$(this).children("img").fadeTo(200,1);
	});
});*/

var win_width = 0;
$(function(){
	//加载头部
	/* $(".content .pic-squre a").hover(function(){
		$(this).children("img").fadeTo(200,0);
	},function(){
		$(this).children("img").fadeTo(200,1);
	});*/
	showRandomBigImage();
	$(".lightbox_back").click(function() {
  		shutLightbox();
		return false;
	});
	if(null==getCookie("PKU_HPC_NAMING_STOP") || ""==getCookie("PKU_HPC_NAMING_STOP")){
		openLightbox();
		setTimeout("shutLightbox();",60);
	}
});
/*$(window).resize(function() {
	_width_ = $(window).width();
	if (win_width != _width_)
	{
		win_width = _width_;
		adjustWidth();
	}
});*/
function showRandomBigImage(){
	var idx = Math.ceil(Math.random()*15);
//	$(".bouti-link-intro").css("background-image","url(img/img_gxn1"+idx+".jpg)");
}
/*function adjustWidth()
{
	var new_height = win_width / 3;
	var new_height2  = win_width / 3.64;
	var new_height3  = (new_height2>380?380:new_height2)-$(".boutiCon").height();
	if(new_height3<=0)
		new_height3=0;
	new_height3=new_height3/2;
	$(".bouti-tit").css("height", (new_height2>380?380:new_height2));
}*/ 
function openLightbox()
{
  	var winW = $(window).width();
	var winH = $(window).height();
	var imW=winW-20;
	if(winW>520)
		imW=300;
	var imH=200;
	$(".lightbox_fore").css("left",(winW-imW)/2);
	$(".lightbox_fore").css("top",(winH-imH)/2);
	$(".lightbox_fore").width(imW);
	$(".lightbox_fore").height(imH);
		
  	$(".lightbox_back").css("display", "block");
	$(".lightbox_fore").css("display", "block");
	$("body").css("overflow", "hidden");
	
}

function shutLightbox()
{
  	$(".lightbox_back").css("display", "none");
	$(".lightbox_fore").css("display", "none");
	$("body").css("overflow", "auto");
}
function shutLightboxForever()
{
  	shutLightbox();
	setCookie("PKU_HPC_NAMING_STOP","true");
}
function getCookie(c_name)
{
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=")
	  	if (c_start!=-1){ 
	    	c_start=c_start + c_name.length+1 
	    	c_end=document.cookie.indexOf(";",c_start)
	    	if (c_end==-1) 
	    		c_end=document.cookie.length
	    	return unescape(document.cookie.substring(c_start,c_end))
    	} 
  	}
	return ""
}
function setCookie(c_name,value)
{
	var expiredays=30;
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

