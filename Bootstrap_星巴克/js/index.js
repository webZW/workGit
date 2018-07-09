var widthOld = null;
var num=0;
var Left_start = new Array();
var offsetLeft_start = new Array();

var imgFirstL=0;
var imgdeltaL=0;
var timer = null;

window.onresize = init;
window.onload = function(){
	// $(".section5>div>ul>li").css({transition:"left 0.5s ease 0s"});
	cssInit();
	init();
	img_run();

	//鼠标移入停止动画
	$(".section5>div>ul>li").on("mouseenter",function(){
		clearInterval(timer);
	});
	$(".section5>div>ul>li").on("mouseleave",function(){
		img_run();
	});
}

function init(){
	//初始化配置
	$(".section5>div>ul>li").css({left:"0",opacity:"1"});
	imgFirstL = $(".section5>div>ul>li").eq(0).offset().left;
	imgdeltaL = $(".section5>div>ul>li").last().offset().left-$(".section5>div>ul>li").first().offset().left;
	
	$(".section5>div>ul>li").each(function(index,element){
		Left_start[index] = $(this).css("left");
		offsetLeft_start[index] = $(this).offset().left;
	})
}

function img_run(){
	//动画效果
	timer = setInterval(function(){
		imgWidth = $(".section5>div>ul>li").width();

		$(".section5>div>ul>li").each(function(index,element){
			if(parseInt($(this).offset().left) < (imgFirstL-50)){
				$(this).css({left:""+((imgdeltaL) - imgWidth*(index))+"px"/*opacity:"0"*/});
			}
		});
		
		$(".section5>div>ul>li").each(function(index,element){
			imgLeft = $(this).offset().left - offsetLeft_start[index];

			// $(this).css({left:""+(imgLeft - imgWidth)+"px",opacity:"1"});

			$(this).animate({left:""+(imgLeft - imgWidth)+"px"},200,"swing")

			console.log(parseInt($(this).offset().left));

		})
		
	},3000)
}

//css配置
function cssInit(){

	$(".container img.hamburger").on("click",function(){
		if($(document).width()>1025){
			$(this).css({display:"none"}).siblings().css({display:"block"});
			$(this).parent().siblings().css({display:"none"}).first().css({display:"block"});
			$(".container .cover").slideDown("1s").css({display:"block"});
			$(".container>div.title>div:nth-of-type(1)").css({display:"none"});
			widthOld = $(".container .title").outerHeight();
			$(".container .title").css({height:"100%"});
		}
	});

	$(".container img.close").on("click",function(){
		if($(document).width()>1025){
			$(this).css({display:"none"}).siblings().css({display:"block"});
			$(this).parent().siblings().css({display:"block"});
			$(".container .cover").slideUp("1s").css({display:"none"});
			$(".container div div:nth-of-type(1)").css({display:"block"});
			$(".container .title").css({height:widthOld});
		}
	});

	$(".container div.section2>div img").on("mouseenter",function(){
		$(this).animate({top:"-5px"},100)
	});

	$(".container div.section2>div img").on("mouseleave",function(){
		$(this).animate({top:"0px"},100)

	});

	$(".container div.section4>div li a").on("mouseenter",function(){
		$(this).animate({top:"-5px"},100)
	});

	$(".container div.section4>div li a").on("mouseleave",function(){
		$(this).animate({top:"0px"},100)
	});

	$(".section5>div>ul>li>a").on("mouseenter",function(){
		$(this).animate({top:"-5px"},100)
	});

	$(".section5>div>ul>li>a").on("mouseleave",function(){
		$(this).animate({top:"0px"},100)
	});
}


/*
var contentWithPadding = $(‘div’). innerWidth();//获取content+padding的宽度

var withoutMargin = $(‘div’). outerWidth();//获取content+padding+border的宽度

var full = $(‘div’). outerWidth(true);//获取content+padding+border+margin的宽度
*/