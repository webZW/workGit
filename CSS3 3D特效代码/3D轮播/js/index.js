
//定义轮播的透视位置
var imgR = parseInt(145 / Math.tan(30 / 180 * Math.PI)) +20 + "px";

var chickNum =1;
var timer = null;
var lb_num = chickNum;
var stop = 1;

//初始化图片位置
$("#wrap ul li").each(function(num,ele){
	$(this).css({
		"transform":"rotateY("+num*60+"deg) translateZ("+imgR+")"
	})
})

Interval();


//点击图片，实现图片轮播

$("#wrap ul li").on("click",function(){
	//限制－自动轮播时不可点击
	if($("#Btn").text() == "切换点击轮播"){
		return;
	}
	chickNum = $(this).index("#wrap ul li");
	var n = 0;
	$("#wrap ul li").each(function(num,ele){
		n = num - chickNum
		$(this).css({
			"transform":"rotateY("+n*60+"deg) translateZ("+imgR+")"
		})
	})
});





$("#Btn").on("click",function(){
	if($(this).text() == "切换自动轮播"){
		$(this).text("切换点击轮播");
		lb_num = chickNum;
		Interval();
	}else{
		$(this).text("切换自动轮播");
		stop = 1;
		clearInterval(timer);
	}

})

function Interval(){
	timer = setInterval(function(){
		//定时器重复处理
		if(stop == 0){
			clearInterval(timer);
		}
		var n = 0;
		$("#wrap ul li").each(function(num,ele){
			n = num - lb_num;
			$(this).css({
				"transform":"rotateY("+n*60+"deg) translateZ("+imgR+")"
			})
		})
		lb_num++;
		stop = 1;
	},1000)
}


/*获取角度值
	$(this).css("transform")获得矩阵

    * 解析matrix矩阵，0°-360°，返回旋转角度 
    * 当a=b||-a=b,0<=deg<=180 
    * 当-a+b=180,180<=deg<=270 
    * 当a+b=180,270<=deg<=360 
    * 
    * 当0<=deg<=180,deg=d; 
    * 当180<deg<=270,deg=180+c; 
    * 当270<deg<=360,deg=360-(c||d); 
    
function getmatrix(a,b,c,d,e,f){  
    var aa=Math.round(180*Math.asin(a)/ Math.PI);  
    var bb=Math.round(180*Math.acos(b)/ Math.PI);  
    var cc=Math.round(180*Math.asin(c)/ Math.PI);  
    var dd=Math.round(180*Math.acos(d)/ Math.PI);  
    var deg=0;  
    if(aa==bb||-aa==bb){  
        deg=dd;  
    }else if(-aa+bb==180){  
        deg=180+cc;  
    }else if(aa+bb==180){  
        deg=360-cc||360-dd;  
    }  
    return deg>=360?0:deg;  
    //return (aa+','+bb+','+cc+','+dd);  
} 
*/


