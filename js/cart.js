require(["config"], function(){
	require(["jquery", "load"], function(){
//		moild
		<% 
			for (var i = 0, len = products.length; i < len; i++) {
				var prod = products[i];
		%>
		<div class="row">
			<span><input type="checkbox" class="chk_prod"></span>
			<span class="id"><%= prod.id %></span>
			<span><img src="<%= prod.imgSrc %>"></span>
			<span><%= prod.name %></span>
			<span class="price"><%= prod.price %></span>
			<span><span class="minus">-</span><input type="text" size="1" value="<%= prod.amount %>" class="			amount"><span class="add">+</span></span>
			<span class="sub"><%= prod.price * prod.amount %></span>
			<span><a href="javascript:void(0)">删除</a></span>
		</div>
		<% } %>
        
        $(function(){
			// 页面打开，则读取 cookie 中已保存的购物车信息，展示到页面中
			$.cookie.json = true;
			var _products = $.cookie("products") || [];
			if (_products.length === 0) {
				alert("购物车为空，请选购商品....");
				location = "index.html";
			}
			// 准备模板数据，渲染
			var data = {
				products : _products
			};
			var html = template("cart_template", data);
			// 显示
			// $(".cart_body").append(html);
			$(html).appendTo(".cart_body");

			// 点击“删除”超级链接，删除所在行信息
			// $(".cart_body a").click(function(){});
			// $(".cart_body a").bind("click", function(){});
			// $(".cart_body a").on("click", function(){})
			// $(".cart_body").delegate("a", "click", function(){})
			// 事件委派
			$(".cart_body").on("click", "a", function(){
				// 获取当前删除元素的id
				var _id = $(this).parents(".row").children(".id").text();
				// 查找 _id 所表示商品在数组中的索引
				var index = isExist(_id, _products);
				// 删除数组 index 索引处元素
				_products.splice(index, 1);
				// 保存回 cookie 中
				$.cookie("products", _products, {expires:10});
				// 删除页面当前行DOM元素
				$(this).parents(".row").remove();

				// 判断是否购物车为空
				if (_products.length === 0) {
					alert("购物车为空");
					location = "product.html";
				}

				// 更新合计
				calcTotal();
			});

			// 数量+/-
			$(".cart_body").on("click", ".add, .minus", function(){
				// 获取点击的 + 所在行
				var _row = $(this).parents(".row");
				// 获取原有数量
				var _amount = _row.find(".amount").val();

				if ($(this).is(".add")) {
					// 加
					_amount++;
				} else {
					if (_amount <= 1)
						return;
					_amount--;
				}
				
				// 获取+所在行商品编号
				var id = _row.children(".id").text();
				// 获取商品在数组中索引
				var index = isExist(id, _products);
				// 修改数组中index索引处元素的数量
				_products[index].amount = _amount;
				// 修改 cookie 中商品数量
				$.cookie("products", _products, {expires:10});
				// 修改页面显示的商品数量
				_row.find(".amount").val(_amount);
				// 获取当前商品单价
				var _price = _row.children(".price").text();
				// 显示修改数量后的小计
				_row.children(".sub").text(_price * _amount);

				// 更新合计
				calcTotal();
			});

			// 输入修改数量
			var oldAmount = 0;
			$(".cart_body .amount").focus(function(){
				oldAmount = $(this).val();
			}).blur(function(){
				// 获取输入数量值
				var _val = $(this).val();
				// 判断输入数量是否合法:大于0的正整数
				if(!/^[1-9]\d*$/.test(_val)) { // 输入不合法
					// 还原原有显示数量
					$(this).val(oldAmount);
					return;
				}
				// 当前行
				var _row = $(this).parents(".row");
				// 获取文本框所在行商品编号
				var id = _row.children(".id").text();
				// 获取商品在数组中索引
				var index = isExist(id, _products);
				// 修改数组中index索引处元素的数量
				_products[index].amount = _val;
				// 修改 cookie 中商品数量
				$.cookie("products", _products, {expires:10});
				// 获取当前商品单价
				var _price = _row.children(".price").text();
				// 显示修改数量后的小计
				_row.children(".sub").text(_price * _val);

				// 更新合计
				calcTotal();
			});

			// 全选
			$("#chk_all").click(function(){
				$(".chk_prod").prop("checked", $(this).prop("checked"));
				calcTotal();
			});

			// 点每行前复选框
			$(".row .chk_prod").click(function(){
				var b = $(".chk_prod:checked").length == $(".chk_prod").length;
				$("#chk_all").prop("checked", b);
				// 更新合计
				calcTotal();
			});

			// 定义函数，计算合计金额
			function calcTotal() {
				var sum = 0;
				/*// 遍历每行，判断是否有勾选复选框
				$(".row").each(function(index, element){
					// 当前遍历到行的复选框选中状态
					var status = $(this).find(".chk_prod").prop("checked");
					// 
					if (status) { // 选中
						sum += Number($(this).children(".sub").text());
					}
				});*/
				$(".chk_prod:checked").each(function(){
					var _row = $(this).parents(".row");
					sum += Number(_row.children(".sub").text());
				});
				// 显示合计金额
				$(".footer .total").text(sum);
			}

			// 查找指定id商品在 products 数组中是否已存在
			// 存在则返回在数组中的下标，否则返回-1
			function isExist(id, products) {
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].id == id)
						return i;
				}

				return -1;
			}
		});

	});
});



//<script type="text/html" id="cart_template">
//		<% 
//			for (var i = 0, len = products.length; i < len; i++) {
//				var prod = products[i];
//		%>
//		<div class="row">
//			<span><input type="checkbox" class="chk_prod"></span>
//			<span class="id"><%= prod.id %></span>
//			<span><img src="<%= prod.imgSrc %>"></span>
//			<span><%= prod.name %></span>
//			<span class="price"><%= prod.price %></span>
//			<span><span class="minus">-</span><input type="text" size="1" value="<%= prod.amount %>" class="			amount"><span class="add">+</span></span>
//			<span class="sub"><%= prod.price * prod.amount %></span>
//			<span><a href="javascript:void(0)">删除</a></span>
//		</div>
//		<% } %>
//	</script>
//	
//
//
//
//$(function(){
//			// 页面打开，则读取 cookie 中已保存的购物车信息，展示到页面中
//			$.cookie.json = true;
//			var _products = $.cookie("products") || [];
//			if (_products.length === 0) {
//				alert("购物车为空，请选购商品....");
//				location = "product.html";
//			}
//			// 准备模板数据，渲染
//			var data = {
//				products : _products
//			};
//			var html = template("cart_template", data);
//			// 显示
//			// $(".cart_body").append(html);
//			$(html).appendTo(".cart_body");
//
//			// 点击“删除”超级链接，删除所在行信息
//			// $(".cart_body a").click(function(){});
//			// $(".cart_body a").bind("click", function(){});
//			// $(".cart_body a").on("click", function(){})
//			// $(".cart_body").delegate("a", "click", function(){})
//			// 事件委派
//			$(".cart_body").on("click", "a", function(){
//				// 获取当前删除元素的id
//				var _id = $(this).parents(".row").children(".id").text();
//				// 查找 _id 所表示商品在数组中的索引
//				var index = isExist(_id, _products);
//				// 删除数组 index 索引处元素
//				_products.splice(index, 1);
//				// 保存回 cookie 中
//				$.cookie("products", _products, {expires:10});
//				// 删除页面当前行DOM元素
//				$(this).parents(".row").remove();
//
//				// 判断是否购物车为空
//				if (_products.length === 0) {
//					alert("购物车为空");
//					location = "product.html";
//				}
//
//				// 更新合计
//				calcTotal();
//			});
//
//			// 数量+/-
//			$(".cart_body").on("click", ".add, .minus", function(){
//				// 获取点击的 + 所在行
//				var _row = $(this).parents(".row");
//				// 获取原有数量
//				var _amount = _row.find(".amount").val();
//
//				if ($(this).is(".add")) {
//					// 加
//					_amount++;
//				} else {
//					if (_amount <= 1)
//						return;
//					_amount--;
//				}
//				
//				// 获取+所在行商品编号
//				var id = _row.children(".id").text();
//				// 获取商品在数组中索引
//				var index = isExist(id, _products);
//				// 修改数组中index索引处元素的数量
//				_products[index].amount = _amount;
//				// 修改 cookie 中商品数量
//				$.cookie("products", _products, {expires:10});
//				// 修改页面显示的商品数量
//				_row.find(".amount").val(_amount);
//				// 获取当前商品单价
//				var _price = _row.children(".price").text();
//				// 显示修改数量后的小计
//				_row.children(".sub").text(_price * _amount);
//
//				// 更新合计
//				calcTotal();
//			});
//
//			// 输入修改数量
//			var oldAmount = 0;
//			$(".cart_body .amount").focus(function(){
//				oldAmount = $(this).val();
//			}).blur(function(){
//				// 获取输入数量值
//				var _val = $(this).val();
//				// 判断输入数量是否合法:大于0的正整数
//				if(!/^[1-9]\d*$/.test(_val)) { // 输入不合法
//					// 还原原有显示数量
//					$(this).val(oldAmount);
//					return;
//				}
//				// 当前行
//				var _row = $(this).parents(".row");
//				// 获取文本框所在行商品编号
//				var id = _row.children(".id").text();
//				// 获取商品在数组中索引
//				var index = isExist(id, _products);
//				// 修改数组中index索引处元素的数量
//				_products[index].amount = _val;
//				// 修改 cookie 中商品数量
//				$.cookie("products", _products, {expires:10});
//				// 获取当前商品单价
//				var _price = _row.children(".price").text();
//				// 显示修改数量后的小计
//				_row.children(".sub").text(_price * _val);
//
//				// 更新合计
//				calcTotal();
//			});
//
//			// 全选
//			$("#chk_all").click(function(){
//				$(".chk_prod").prop("checked", $(this).prop("checked"));
//				calcTotal();
//			});
//
//			// 点每行前复选框
//			$(".row .chk_prod").click(function(){
//				var b = $(".chk_prod:checked").length == $(".chk_prod").length;
//				$("#chk_all").prop("checked", b);
//				// 更新合计
//				calcTotal();
//			});
//
//			// 定义函数，计算合计金额
//			function calcTotal() {
//				var sum = 0;
//				/*// 遍历每行，判断是否有勾选复选框
//				$(".row").each(function(index, element){
//					// 当前遍历到行的复选框选中状态
//					var status = $(this).find(".chk_prod").prop("checked");
//					// 
//					if (status) { // 选中
//						sum += Number($(this).children(".sub").text());
//					}
//				});*/
//				$(".chk_prod:checked").each(function(){
//					var _row = $(this).parents(".row");
//					sum += Number(_row.children(".sub").text());
//				});
//				// 显示合计金额
//				$(".footer .total").text(sum);
//			}
//
//			// 查找指定id商品在 products 数组中是否已存在
//			// 存在则返回在数组中的下标，否则返回-1
//			function isExist(id, products) {
//				for (var i = 0, len = products.length; i < len; i++) {
//					if (products[i].id == id)
//						return i;
//				}
//
//				return -1;
//			}
//		});