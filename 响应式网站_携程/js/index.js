window.onload = function(){
	$("section.img ul.banner").css({height:""+ ($("section.img ul.banner").width()*(248/1242)) +"px"});

	var imgWidth = 0; 
	imgWidth = $("section.img ul.banner").width();


	var _this = $("section.img ul.banner li");
	//图片初始排序
	_this.eq(0).css({webkitTransform:"translateX(0px)"}).siblings().css({webkitTransform:"translateX("+imgWidth+"px)"});

/* JS方式
	var banner_img = document.getElementById("bannerID");
	var li_img = banner_img.getElementsByTagName("li");

	for(var i=1;i<li_img.length;i++){
		li_img[i].style.webkitTransform = "translateX("+imgWidth+"px)";

	}
*/

	// 初始化界面-设置画面变化时监听事件
	window.onresize = init;
	function init(){
		//图片自适应宽度
		imgWidth = $("section.img ul.banner").width();
		//通栏高度变化
		$("section.img ul.banner").css({height:""+ (imgWidth *(248/1242)) +"px"});
		

	}

	//定义画面移动标签
	var prev = -1;
	var index = 0;
	var next = 1;
	//画面定时移动
	var timer = setInterval(function(){
		showNext();
	},3500);

	function showNext(){
		prev = index;
		index = next;
		next++;
		if(next>4){
			next=0;
		}
		_this.css({transition:"transform 0.5s ease 0s"});
		_this.eq(prev).css({webkitTransform:"translateX("+(-imgWidth)+"px)"}).
			parent().children().eq(index).css({webkitTransform:"translateX(0px)",opacity:"1"}).
			parent().children().eq(next).css({webkitTransform:"translateX("+imgWidth+"px)",opacity:"0"});

	}

	var banner_img = document.getElementById("bannerID");
	var li_img = banner_img.getElementsByTagName("li");
	var startX;   //触摸开始手指位置
	var starTime; //时间戳
	var deltax;   //手指的偏移量
	var endX;

	//触摸开始事件
	banner_img.addEventListener("touchstart",function(event){
		//初始化运行
		event.preventDefault();
		if(event.touches.length>1){
			return;
		}
		clearInterval(timer);

		startX = event.touches[0].clientX;
		startTime = new Date();

		_this.css({transition:"none",opacity:"1"});

	},false)

	//触摸移动事件
	banner_img.addEventListener("touchmove",function(event){
		//初始化运行
		event.preventDefault();
		if(event.touches.length>1){
			return;
		}
		clearInterval(timer);

		deltaX =event.touches[0].clientX-startX;
		_this.eq(index).css({webkitTransform:"translateX("+(deltaX)+"px)"});
		_this.eq(prev).css({webkitTransform:"translateX("+(-imgWidth + deltaX)+"px)"});
		_this.eq(next).css({webkitTransform:"translateX("+(imgWidth + deltaX)+"px)"});
	},false)

	//触摸停止事件执行判断
	banner_img.addEventListener("touchend",function(event){
		//初始化运行
		event.preventDefault();
		if(event.touches.length>1){
			return;
		}
		clearInterval(timer);

		endX = event.changedTouches[0].clientX;
		deltaX = startX - endX;
		var deltaTime = new Date() - startTime;
		
		_this.css({transition:"transform 0.5s ease 0s"});

		//当移动超过一半时切切换
		if(deltaX >= imgWidth/2 || (deltaX>=30 && deltaTime>300)){
			prev = index;
			index = next;
			next++;
			if(next>4){
				next=0;
			}
			_this.eq(prev).css({webkitTransform:"translateX("+(-imgWidth)+"px)"}).
				parent().children().eq(index).css({webkitTransform:"translateX(0px)",opacity:"1"}).
				parent().children().eq(next).css({webkitTransform:"translateX("+imgWidth+"px)",opacity:"0"});
		}else if(deltaX <= -imgWidth/2 || (deltaX<=-30 && deltaTime>300)){
			next = index;
			index = prev;
			prev--;
			if(prev<0){
				prev = 4;
				_this.eq(prev).css({opacity:"0"});
			}

			_this.eq(prev).css({webkitTransform:"translateX("+(-imgWidth)+"px)",opacity:"0"}).
				parent().children().eq(index).css({webkitTransform:"translateX(0px)",opacity:"1"}).
				parent().children().eq(next).css({webkitTransform:"translateX("+imgWidth+"px)",opacity:"1"});
		}else{
			_this.eq(prev).css({webkitTransform:"translateX("+(-imgWidth)+"px)"}).
				parent().children().eq(index).css({webkitTransform:"translateX(0px)",opacity:"1"}).
				parent().children().eq(next).css({webkitTransform:"translateX("+imgWidth+"px)",opacity:"1"});
		}

		timer = setInterval(function(){
			showNext();
		},3500);
		
	},false)		

}


function getStyle(ele,property){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele)[property];
	}else if(ele.currentStyle){
		return ele.currentStyle[property];
	}
}

/*

//给窗口添加一个窗口大小监听事件
window.onresize = init;

//初始化界面
function init(){
	//获取当前窗口宽度
	windowWidth = document.documentElement.clientWidth;
	carousel.style.height = windowWidth*130/200+"px";
	
	//设置每个li的默认位置
	for(var i=1; i<lis.length; i++){
		lis[i].style.webkitTranform = "translateX("+windowWidth+"px)";
	}
}


var startX;   //触摸开始手指位置
var starTime; //时间戳
var deltax;   //手指的偏移量

//事件监听
carousel.addEventListener("touchstart",function(event){
	//阻止默认事件
	event.preventDefault();
	if(event.touches.length > 1){  //手指个数
		return;
	}
	//清除鼠标滑动
	clearInterval(timer);
	
	//记录偏移量
	deltaX = event.touches[0].clientX;
	//记录手指位置
	startX = event.touches[0].clientX;
	//记录时间戳
	startTime = new Date();

	//去掉过度效果
	lis[pre].style.transition = "none";
	lis[index].style.transition = "none";
	lis[next].style.transition = "none";


},false);

//触摸移动过程中
carousel.addEventListener("touchmove",function(event){
	//阻止默认事件
	event.preventDefault();
	if(event.touches.length > 1){  //手指个数
		return;
	}
	//清除鼠标滑动
	clearInterval(timer);
	//得到当前坐标
	var clientX = event.touches[0].clientX;
	//改变图片的位置
	lis[index].style.webkitTranform = "translateX("+ (clietX - deltaX) +"px)";
	
	lis[next].style.webkitTranform = "translateX("+ (windowWidth + clietX - deltaX) +"px)";

	lis[pre].style.webkitTranform = "translateX("+ ( -windowWidth + clietX - deltaX) +"px)";


},false);

//触摸结束处理
carousel.addEventListener("touchstop",function(event){
	//阻止默认事件
	event.preventDefault();
	if(event.touches.length > 1){  //手指个数
		return;
	}

	//判断当前滑动是否成功
	//记录手指离开时手指信息 ＝> event.changedTouches[?];
	var distance = event.changedTouches[0].clientX - startX;

	//计算滑动的时间(毫秒级)
	var time = new Date() - startTime();

	//若向右滑动超过了屏幕的一半 或者向右滑动时间小于一半500 则认为滑动成功
	if(distance > windowWidth / 2 || (distance>30 && time<300)){
		next = index;
		index = prev;
		prev--;
		if(prev < 0){
			prev = 3;
		}
		//加过渡
		lis[index].style.transition = "all 0.3s ease 0s";
		lis[next].style.transition = "all 0.3s ease 0s";
		//移动
		lis[index].style.webkitTranform = "translateX(0px)";
		lis[next].style.webkitTranform = "translateX("+windowWidth+"px)";

	}else if(distance <= -windowWidth/2 || (distance<-30 && time<300)){
		//反方向成功
		showNext();
	}else{
		//滑动效果不成功
		lis[prev].style.transition = "all 0.3s ease 0s";
		lis[index].style.transition = "all 0.3s ease 0s";
		lis[next].style.transition = "all 0.3s ease 0s";

		lis[index].style.webkitTranform = "translateX(0px)";
		lis[next].style.webkitTranform = "translateX("+windowWidth+"px)";
		lis[prev].style.webkitTranform = "translateX("+ (-windowWidth) +"px)";
	}
	clearInterval(timer);
	timer = setInterval(function(){
		showNext();
	},4000);
},false);

*/