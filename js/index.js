require(["config"], function(){
	require(["jquery", "load"], function(){
      //轮播图效果
      carou($(".banner"),$(".banner ul"),$(".banner li"),$(".pages"),false,false)
      carou($(".imgList"),$(".next"),$(".nextimg"),$(".pages"),true,false,$(".preimg"),$(".nextimg"))
      function carou(container,ul,li,pages,boool,neednum,prev,next){
      	var lis = li, 
			len = lis.length,
			liWidth = lis.width(),
			uls = ul,
			currentIndex = 1,
			nextIndex = 2,
			timer = null,
			circles = [];
			uls.css("left",-liWidth + "px");
			lis.first().clone(true).insertAfter(lis.last());
			lis.eq(len-1).clone(true).insertBefore(lis.first());
			uls.css("width",liWidth*(len+2) + "px");
			len += 2
			function move(){
				var _left = nextIndex*-1*liWidth
				uls.stop().animate({left:_left},"normal",function(){
					currentIndex = nextIndex
					nextIndex++
					if(currentIndex >= len - 1){
					currentIndex = 1;
					nextIndex = 2;
					uls.css("left",-liWidth + "px")
					}
					if(currentIndex <= 0){
						currentIndex = len - 2;
						nextIndex = len - 1;
					uls.css("left",-(len-2)*liWidth + "px")
					}
				})
				var cir;
				if(nextIndex === 0){
					cir = len - 3
				}
				else if(nextIndex === len - 1){
					cir = 0
				}
				else{
					cir = nextIndex - 1
				}
				pages.children("div").eq(cir).addClass("current").siblings().removeClass("current")
			}
			timer = setInterval(move,5000)
			var _div = []
			for(let i = 0 ; i < len-2 ; i++){
				_div[i] = document.createElement("div")
				if(neednum)
				_div[i].innerHTML = ""+(i+1)+""
				pages.append(_div[i])
				$(_div[i]).click(function(){
					if(i === (currentIndex - 1))
					return
					else
					nextIndex = i + 1
					move()
				})
			}
			$(_div[0]).addClass("current")
			
			container.hover(function(){
				clearInterval(timer)
			},function(){timer = setInterval(move,5000)})
			if(boool){
				prev.click(function(){
				nextIndex = currentIndex - 1
				move()
				})
				next.click(function(){
					move()
				})
			}
			
      }

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
		
		//joincart
		function joinCart(){
			$(".sift a").click(function(){
				alert("in");
				// 找出超级链接所在行
				var _row = $(this).parent(".join");
				// 将所在行商品信息保存到对象中
				var product = {
					id : _row.children().first().val(),
					name : _row.children().eq(1).children().eq(2).text(),
					price : _row.children().eq(1).children().eq(3).text(),
					imgSrc : _row.children(".prod_img").attr("src"),
					amount : 1
				};
				// 判断在 cookie 中是否有已存在的购物车数组结构
				// 使用 jquery 的 cookie 插件操作 cookie
				$.cookie.json = true; // 自动转换
				var _products = $.cookie("products") || [];
				// 查找当前选购商品的ID在数组中已选购商品元素中是否存在
				var index = isExist(product.id, _products);
				if (index === -1) { // 不存在
					// 向数组中添加元素
					_products.push(product); 
				} else { // 存在，则修改数量
					_products[index].amount++;
				}
				// 将数组存回到 cookie 中
				$.cookie("products", _products, {expires:10});
				return false;
			});

			// 查找指定id商品在 products 数组中是否已存在
			// 存在则返回在数组中的下标，否则返回-1
			function isExist(id, products) {
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].id == id)
						return i;
				}

				return -1;
			}
		}
		

		//吸顶
		$(document).ready(function(){
			ceil();
		})
		function ceil(){
			var winHeight = $(window).height();
			var layoutHeight = $(".banner").offset().top;
			var autoScroll = true;
			$(window).scroll(function(){
				console.log(layoutHeight)
				if (autoScroll) {
					var _scrollTop = $(window).scrollTop();
					if (_scrollTop > layoutHeight) {
						$(".ceiling").show();
					} else {
						$(".ceiling").hide();
					}	
				}
			});
			
		}
	});
})


			

