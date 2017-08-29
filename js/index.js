require(["config"], function(){
	require(["jquery", "load",], function(){
      //轮播图效果
//    function carousel(){
//    	    var $lis = $("li"), // 所有轮播图片的盒子
//				len = $lis.length, // 轮播图片张数
//				liWidth = $lis.outerWidth(), // 图片盒子宽度
//				currentIndex = 1, // 当前显示图片索引
//				nextIndex = 2, // 即将显示图片索引
//				timer = null; // 轮播计时器
//			// 克隆第一张及最后一张图片
//			var $first = $lis.eq(0).clone(true),
//				$last = $lis.eq(len - 1).clone(true);
//			// 将克隆的第一张图片添加到最后
//			$("ul").append($first);
//			// 将克隆的最后一张图片添加到开头
//			$("ul").prepend($last);
//			// len增加:新增了2张图片
//			len += 2;
//			// 设置 ul 宽度
//			$("ul").width(len * liWidth);
//			// 默认显示第一张内容的图片
//			$("ul").css({
//				left : -liWidth
//			});
//			// 添加小圆点
//			var _html = "";
//			for (var i = 0; i < len - 2; i++) {
//				_html += "<div></div>";
//			}
//			// $("#pages").html(_html);
//			// $("#pages").append(_html);
//			$(_html).appendTo("#pages").first().addClass("current");
//	
//			// 鼠标移入/移出容器，停止/开启自动轮播计时器
//			$("#container").hover(function(){
//				// mouseenter
//				clearInterval(timer);yuj mn                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
//			}, function(){
//				// mouseleave
//				timer = setInterval(move, 3000);
//			}).mouseleave(); //.trigger("mouseleave");
//	
//			// 点击小圆点，切换显示图片
//			$("#pages").on("click", "div", function(){
//				var _index = $(this).index(); // 获取当前点击小圆点索引
//				nextIndex = _index + 1;
//				move();
//			});
//	
//			// 向上翻页
//			$("#prev").click(function(){
//				nextIndex = currentIndex - 1;
//				move();
//			});
//	
//			// 向下翻页
//			$("#next").click(move);
//	
//			function move() {
//				// 计算运动定位
//				var _left = -1 * liWidth * nextIndex;
//				// 计算待显示红色小圆点的索引
//				var circleIndex;
//				if (nextIndex === len - 1)
//					circleIndex = 0;
//				else if (nextIndex === 0)
//					circleIndex = len - 3;
//				else
//					circleIndex = nextIndex - 1;
//				// 切换小圆点样式
//				$("#pages div").eq(circleIndex).addClass("current").siblings().removeClass("current");
//	
//				// 调用运动方法
//				$("ul").stop().animate({left : _left}, "fast", function(){
//					if (nextIndex >= len) {
//						currentIndex = 1;
//						nextIndex = 2;
//						$("ul").css("left", -liWidth);
//					}
//					if (currentIndex <= 0) {
//						currentIndex = len - 2;
//						nextIndex = len - 1;
//						$("ul").css("left", -liWidth * (len - 2));
//					}
//				});
//				// 修改索引
//				currentIndex = nextIndex;
//				nextIndex++;
//			}
//    }

      
      
      //爬楼梯
      $(function(){
			var winHeight = $(window).height();
			var layoutHeight = $(".floor").offset().top;
			var autoScroll = true;
			$(window).scroll(function(){
				if (autoScroll) {
					var _scrollTop = $(window).scrollTop();
					if (_scrollTop > layoutHeight - winHeight / 2) {
						$(".ladder").stop().fadeIn();
					} else {
						$(".ladder").stop().fadeOut();
					}
					$(".floor").each(function(index, element){
						var _top = $(element).offset().top;
						if (_scrollTop > _top - winHeight/2) {
							$(".ladder").eq(index)
											  .children("span").show()
											  .end()
											  .siblings()
											  .children("span").hide();
						}
					});
				}
			});
			$(".ladder").on("click", "li", function(){
				autoScroll = false;
				var idx = $(this).index();
				var _top = $(".floor").eq(idx).offset().top;
				$("html, body").stop().animate({scrollTop:_top}, function(){
					autoScroll = true;
				});
		});
	});
})


			

