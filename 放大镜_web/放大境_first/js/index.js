//基础DOM获取
var mainPic = document.querySelector("#mainPic");
var mainPic_move = mainPic.getElementsByTagName("div")[0];
var changePic = document.querySelector("#changePic");

window.onload = function(){
	//鼠标移动跟随事件
	
	mainPic.addEventListener("mouseenter",function(event){

		// console.log(event);
		mainPic_move.style.display = "block";
		changePic.style.visibility = "visible";

	},false);

	mainPic.addEventListener("mouseleave",function(event){
		// console.log(event);
		mainPic_move.style.display = "none";
		changePic.style.visibility = "hidden";

	},false);

	mainPic.addEventListener("mousemove",function(event){
		// console.log(event);

		mainPic_move.style.top = event.clientY - mainPic_move.offsetHeight/2 + "px";
		mainPic_move.style.left = event.clientX - mainPic_move.offsetWidth/2 + "px";

		if(parseInt(getStyle(mainPic_move,"top"))<0){
			mainPic_move.style.top = "0px";
		}
		if(parseInt(getStyle(mainPic_move,"left"))<0){
			mainPic_move.style.left = "0px";
		}
		if(parseInt(getStyle(mainPic_move,"top"))+mainPic_move.offsetHeight>mainPic.offsetHeight){
			mainPic_move.style.top = mainPic.offsetHeight - mainPic_move.offsetHeight + "px";
		}
		if(parseInt(getStyle(mainPic_move,"left"))+mainPic_move.offsetWidth>mainPic.offsetWidth){
			mainPic_move.style.left = mainPic.offsetWidth - mainPic_move.offsetWidth + "px";
		}

		// console.log((parseInt(getStyle(mainPic_move,"left"))/mainPic.offsetWidth)*changePic.offsetWidth+"px");

		//鼠标移动画面跟随
		changePic.style.backgroundSize = ""+(mainPic.offsetWidth*2)+"px auto";

		// 如何分别获取背景图的宽高？？？？
		changePic.style.backgroundPosition =""+ -(parseInt(getStyle(mainPic_move,"left"))/mainPic.offsetWidth)*960+"px "+ -(parseInt(getStyle(mainPic_move,"top"))/mainPic.offsetHeight)*540+"px"; 
		// console.log(changePic.style.backgroundPosition);
	},false);




}

function getStyle(ele,pro){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele)[pro];
	}else if(ele.currentStyle){
		return ele.currentStyle[pro];
	}
}