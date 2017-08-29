require(["config"], function(){
	require(["jquery", "load"], function(){
      //轮播图效果
      
      
      
      //爬楼梯
      $(function(){
			// 获取窗口高度
			var winHeight = $(window).height();
			// 获取1L之前的布局结构高度
			var layoutHeight = $(".floor").offset().top;
			// 标记是鼠标滚轮的滚动还是点击菜单导航的滚动
			var autoScroll = true;
			// 滚动
			$(window).scroll(function(){
				if (autoScroll) {
					// 获取当前滚动的高度
					var _scrollTop = $(window).scrollTop();
					// 判断滚动的高度
					if (_scrollTop > layoutHeight - winHeight / 2) {
						$(".side_menu").stop().fadeIn();
					} else {
						$(".side_menu").stop().fadeOut();
					}

					// 滚动过程中导航菜单样式切换
					$(".floor").each(function(index, element){
						// 当前遍历到楼层在文档中距离顶部高度
						var _top = $(element).offset().top;
						// 判断
						if (_scrollTop > _top - winHeight/2) {
							$(".side_menu li").eq(index)
											  .children("span").show()
											  .end()
											  .siblings()
											  .children("span").hide();
						}
					});
				}
			});

			// 点击菜单跳转
			// $(".side_menu").delegate("li", "click", function(){});
			$(".side_menu").on("click", "li", function(){
				// 标记点击滚动
				autoScroll = false;
				// 找出当前点击li的索引
				var idx = $(this).index();
				// 计算idx对应楼层在文档中的定位
				var _top = $(".floor").eq(idx).offset().top;
				// 运动动画
				$("html, body").stop().animate({scrollTop:_top}, function(){
					autoScroll = true;
				});
				// 点击的 li 切换显示样式内容
				$(this).children("span").show().end().siblings().children("span").hide();
			});

			// 菜单上移入移出
			$(".side_menu li").hover(function(){
				$(this).children("span").show();
			}, function(){
				$(this).children("span").hide();
			});
		});
	});
})


			

