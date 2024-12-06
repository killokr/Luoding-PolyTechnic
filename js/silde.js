window.onload = function(){
	'use strict';
	let silist = document.querySelectorAll(".silder a");
	let points = document.querySelectorAll(".silder .points li");
	let prev = document.querySelector(".silder .prev");
	let next = document.querySelector(".silder .next");
	let sileng = silist.length;
	let timer = null;
	let innertimer = null;
	let count = 0;  // 动画步伐数限制（边界处理）
	let pmoniter = 0;  // 当前播放到第pmoiter张轮播图
	let flag = true;	//受击点小于当前点为TRUE
	// 初始化位置
	for(let i = 0 ; i < sileng ; i++){
		silist[i].style.left = i * 1170 + 'px';
	}
	timer = setInterval(autoplay,5000);
	// 自动轮播
	function autoplay(){
		clearInterval(innertimer);
		pmoniter++;
		alterPoints();
		innertimer = setInterval(function(){
			for(let i = 0 ; i < sileng ; i++){
				// 越界(-5850)调备(1170)
				if (silist[i].style.left == '-5850px') silist[i].style.left = '1170px';
				silist[i].style.left = parseInt(silist[i].style.left) - 65 + 'px';
			}
			count++;  // 0~17 共计18*65=1170
			// 播图完成，停止播放
			if (count == 18) {
				count = 0;
				clearInterval(innertimer);
				return;
			}
		},30);
	}
	prev.onclick = function(){
		// 正在播放，不予处理
		if (count > 0) {
			return;
		}
		pmoniter--;
		alterPoints();
		clearInterval(timer);
		clearInterval(innertimer);
		innertimer = setInterval(function(){
			for(let i = 0 ; i < sileng ; i++){
				// 越界(5850)调备(-1170) 
				if (silist[i].style.left == '5850px') silist[i].style.left = '-1170px';
				silist[i].style.left = parseInt(silist[i].style.left) + 65 + 'px';
			}
			count++;
			// 播图完成，停止播放
			if (count == 18) {
				count = 0
				clearInterval(timer);
				clearInterval(innertimer);
				timer = setInterval(autoplay,5000);
				return;
			}
		},30);
	}
	next.onclick = function(){
		// 正在播放，不予处理
		if (count > 0) {
			return;
		}
		pmoniter++;
		alterPoints();
		clearInterval(timer);
		clearInterval(innertimer);
		innertimer = setInterval(function(){
			for(let i = 0 ; i < sileng ; i++){
				// 越界(-5850)调备(1170) 
				if (silist[i].style.left == '-5850px') silist[i].style.left = '1170px';
				silist[i].style.left = parseInt(silist[i].style.left) - 65 + 'px';
			}
			count++;
			// 播图完成，停止播放
			if (count == 18) {
				count = 0
				clearInterval(timer);
				clearInterval(innertimer);
				timer = setInterval(autoplay,5000);
				return;
			}
		},30);
	}
	for(let i = 0 ; i < sileng ; i++){
		points[i].onclick = function(){
			if (count > 0 || i == pmoniter) {
				return;
			}
			// 当前点进入预备
			silist[pmoniter].style.left = '0px';
			// 检测受击点与当前点大小关系并使受击点进入预备状态
			if (i < pmoniter) {
				silist[i].style.left = '-1170px';
				flag = true;
				alterPoints(pmoniter-(pmoniter-i) || 10086);
			}else{
				silist[i].style.left = '1170px';
				flag = false;
				alterPoints(pmoniter+(i-pmoniter));
			}
			
			clearInterval(timer);
			clearInterval(innertimer);
			innertimer = setInterval(function(){
				// 动画
				if (flag){
					silist[pmoniter].style.left = parseInt(silist[pmoniter].style.left) + 65 + 'px';
					silist[i].style.left = parseInt(silist[i].style.left) + 65 + 'px';
				}else{
					silist[pmoniter].style.left = parseInt(silist[pmoniter].style.left) - 65 + 'px';
					silist[i].style.left = parseInt(silist[i].style.left) - 65 + 'px';
				}
				count++;
				// 动画完成，以受击点i为监视者，立即调整
				if (count == 18) {
					for(let j = 0 ; j < sileng ; j++){
						if (j == i) continue;
						silist[j].style.left = j*1170-i*1170 + 'px';
					}
					count = 0;
					clearInterval(timer);
					clearInterval(innertimer);
					pmoniter = i;
					timer = setInterval(autoplay,5000);
					return;
				}
			},30);
		}
	}
	function alterPoints(){
		for (let i = 0 ; i < sileng ; i++){
			points[i].className = '';
		}
		if (arguments[0]) {
			if (arguments[0] == 10086) {
				points[0].className = 'active';
				return;
			}
			points[arguments[0]].className = 'active';
			return;
		}
		pmoniter = pmoniter == -1 ? 5 : pmoniter;
		pmoniter = pmoniter == 6 ? 0 : pmoniter;
		points[pmoniter].className = 'active';
	}
	// 鼠标悬浮停止轮播
	silist[0].parentNode.onmouseover = function(){
		// 正在播放，不予处理
		if (count > 0) {
			return;
		}
		clearInterval(timer);
		clearInterval(innertimer);
	}
	silist[0].parentNode.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(autoplay,5000);
	}
};

