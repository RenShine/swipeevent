/*
作者：任大帅
功能：判断用户的手指是左滑动还是右滑动
制作时间：2014-5-6;
使用方法：$(elemt).bind('swipeLeft',function(){
	
})

*/

(function($) {
	var startX,moveX,starttime;
	function start(event){
		event.preventDefault();
		var touch = event.touches[0];
		//用户手指按下时获取x坐标
		startX = touch.pageX;  
		starttime = +new Date;
	}
	function move(event){
		event.preventDefault();
		var touch = event.touches[0];
		//用户手指移动时获取和开始坐标的距离
		moveX = touch.pageX - startX;
	}
	function end(event){
		event.preventDefault();
		var touch = event.touches[0]; 
		var duration = +new Date - starttime;   
		//如果滑动时间超过250毫秒并滑动距离超过20px则触发
		var isValidSlide = Number(duration) < 250 && Math.abs(moveX) > 20;
		if(!isValidSlide){
			if (moveX > 0) { 
				//触发左滑动事件
                $.event.trigger('swipeRight',null,this); 
            }else if(moveX < 0){
            	//触发右滑动事件
                $.event.trigger('swipeLeft',null,this); 
            }
		}  
	}

	$.event.special.swipeLeft = {
		setup:function(){ 
			var elem = this;
			elem.addEventListener('touchstart',start,false);
			elem.addEventListener('touchmove',move,false);
			elem.addEventListener('touchend',end,false);

		}, 
		teardown:function(){ 
			var elem = this;
			$.event.remove(elem,'touchstart'); 
			$.event.remove(elem,'touchmove'); 
			$.event.remove(elem,'touchend');  
		}
	};

	$.fn.swipeLeft = function(callback){
		return this.bind('swipeLeft',callback);
	};
	$.fn.swipeRight = function(callback){
		return this.bind('swipeRight',callback);
	}; 
})(jQuery);