/**
 * Created by Administrator on 2017/2/17 0015.
 */

$(function() {
	// 调用轮播 调用SuperSlide */
	jQuery(".banner").slide({
		titCell : ".banner-item ul",
		mainCell : ".banner-img ul",
		effect : "fold",
		autoPlay : true,
		autoPage : true,
		trigger : "click"
	});

	// 商品hover效果
	$(document).on("mouseenter", ".sp-goods", function(event) {
        $(this).addClass("sp-goods_hover");
    }).on("mouseleave", ".sp-goods", function(event) {
        $(this).removeClass("sp-goods_hover");
    });
	
	window.homeIndex=0;
});
// 首页加入购物车
function addToCartPage(obj) {
	var url = "/customer/cart/commodity";
	var amount = 1;
	var commodityCode = obj.find("input[name='comCodePage']").val();
	var pictureUrl = obj.find("input[name='picUrlPage']").val();
	var params = {
		commodityCode : commodityCode,
		commodityAmount : amount,
		pictureUrl : pictureUrl
	};
	tool.shopCartMove(obj, $(".shopping-car"), pictureUrl);
	tool.ajaxPostSubmit(url, params, function(msg) {
		$("#cartNum").html(msg.result);
	});
}
// 首页瀑布流形式展示数据图片
function flow() {
	var winHeiht = $(window).height();
	$(".sp-goods-list").each(function(i, v) {
		var offsetHeight = $(this).offset().top - $(window).scrollTop();
		$(this).find("img").each(function(i, v) {
			var dataSrc = $(this).attr("data-id");
			if (offsetHeight < winHeiht) { // 内容距离浏览器顶部的距离 > 浏览器可视区域
											// （内容显示在可视区域）
				$(this).attr("src", dataSrc); // src赋值
			} else {
				$(this).attr("src", "");
			}
		})
	});
}

// 滚动滚动条触发事件
$(window).scroll(function() {
	flow();
});
flow();

// 右侧快捷菜单栏
$(".sp-goods-list").each(function() {
	var view = $(this).offset().top - 180;
	$(this).attr("data-id", view);
});

// 点击滚动
$(".js_top").on("click", function(e) {
	var speed = 1000;// 滑动的速度
	var code = $(this).find("a").attr("data-id");
	var indexcode = "";
	var moveheight = "";
	$(".sp-goods-list").each(function() {
		indexcode = $(this).attr("name");
		if (indexcode == code) {
			moveheight = $(this).attr("data-id");
		}
	});
	$('body,html').animate({
		scrollTop : moveheight
	}, speed);
	return false;
});

function replaceHomePageCommodity() {
	homeIndex++;
	var url = "/product/replaceHomePageCommodity";
	$.post(url,{"homeIndex":homeIndex}, function(data) {
		var result = data.result;
		if (result != undefined && result != null) {
			$('#recommendDiv').empty();
			fillData("recommendDiv",result);
		}
	})
}

function fillData(pageId, mainPageRmdComdList) {
	var arr = [];
	if (mainPageRmdComdList != undefined && mainPageRmdComdList != null
			&& mainPageRmdComdList.length > 0) {
		if (mainPageRmdComdList != undefined && mainPageRmdComdList != null
				&& mainPageRmdComdList.length <= 6) {
			for (var i = 0; i < mainPageRmdComdList.length; i++) {
				var commodityCode = mainPageRmdComdList[i].commodityCode;
				var imageUrl = mainPageRmdComdList[i].imageUrl;
				var commodityName = mainPageRmdComdList[i].commodityName;
				var commodityPrice = mainPageRmdComdList[i].commodityPrice;
				xsd = commodityPrice.toString().split(".");
				if (xsd.length == 1) {
					commodityPrice = commodityPrice.toString() + ".00";
				}
				if (xsd.length > 1) {
					if (xsd[1].length < 2) {
						commodityPrice = commodityPrice.toString() + "0";
					}
				}
				arr.push('<div class="sp-goods sp-position sp-border-right">');
				arr.push('<a href="/product/detail?commodityCode='
								+ commodityCode
								+ '" target="_blank" class="sp-goods-box" onclick="clickSend(this)" Tracker=&apos;"actionType":"mousedown","actionName":"product.getCommodityDetail","domvalue":{"commodityCode":"'
								+ commodityCode + '"}}&apos; >');
				arr.push('<div class="sp-hot-img sp-center">');
				arr.push('<img src="' + imageUrl + '" class="jumptoCommdity"/>');
				arr.push('</div>');
				arr.push('<p class="sp-goods-name sp-font-md sp-center">'
						+ commodityName + '</p>');
				arr.push('<p class="sp-goods-price sp-font-md sp-center sp-color-red">¥');
				arr.push('<span class="' + commodityCode + '">'+commodityPrice+'</span>');
				arr.push('</p>');
				arr.push('</a>');
				arr.push('<a href="javascript:void(0);" class="sp-join-car" onclick="addToCartPage($(this))" >加入购物车');
				arr.push('<input type="hidden" name="comCodePage" value="'
						+ commodityCode + '"/>');
				arr.push('<input type="hidden" name="picUrlPage" value="' + imageUrl
						+ '"/>');
				arr.push('</a>');
				arr.push('</div>');
			}
		} else if (mainPageRmdComdList != undefined
				&& mainPageRmdComdList != null
				&& mainPageRmdComdList.length > 6) {
			for (var i = 0; i < 6; i++) {
				var commodityCode = mainPageRmdComdList[i].commodityCode;
				var imageUrl = mainPageRmdComdList[i].imageUrl;
				var commodityName = mainPageRmdComdList[i].commodityName;
				var commodityPrice = mainPageRmdComdList[i].commodityPrice;
				xsd = commodityPrice.toString().split(".");
				if (xsd.length == 1) {
					commodityPrice = commodityPrice.toString() + ".00";
				}
				if (xsd.length > 1) {
					if (xsd[1].length < 2) {
						commodityPrice = commodityPrice.toString() + "0";
					}
				}
				arr.push('<div class="sp-goods sp-position sp-border-right sp-goods-change">');
				arr.push('<a href="/product/detail?commodityCode='
								+ commodityCode
								+ '" target="_blank" class="sp-goods-box" onclick="clickSend(this)" Tracker=&apos;"actionType":"mousedown","actionName":"product.getCommodityDetail","domvalue":{"commodityCode":"'
								+ commodityCode + '"}}&apos; >');
				arr.push('<div class="sp-hot-img sp-center">');
				arr.push('<img src="' + imageUrl + '" class="jumptoCommdity"/>');
				arr.push('</div>');
				arr.push('<p class="sp-goods-name sp-font-md sp-center">'
						+ commodityName + '</p>');
				arr.push('<p class="sp-goods-price sp-font-md sp-center sp-color-red">¥');
				arr.push('<span class="' + commodityCode + '">'+commodityPrice+'</span>');
				arr.push('</p>');
				arr.push('</a>');
				arr.push('<a href="javascript:void(0);" class="sp-join-car" onclick="addToCartPage($(this))" >加入购物车');
				arr.push('<input type="hidden" name="comCodePage" value="'
						+ commodityCode + '"/>');
				arr.push('<input type="hidden" name="picUrlPage" value="' + imageUrl
						+ '"/>');
				arr.push('</a>');
				arr.push('</div>');
			}

		}		
		$("#" + pageId).append(arr.join(''));		
	}
}
