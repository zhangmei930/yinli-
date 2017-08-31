require(["config"], function(){
	require(["jquery", "template", "cookie", "load"], function($, template){
		cartHandle();
		function cartHandle (){
			$.cookie.json = true;
			var _products = $.cookie("products") || [];
			if (_products.length === 0) {
				alert("购物车为空，请选购商品....");
				location = "http://127.0.0.1:8080/index.html";
			}
			var data = {
				products : _products
			};
			var html = template("cart_template", data);
			$(html).appendTo(".cart_body");
			$(".cart_body").on("click", "a", function(){
				var _id = $(this).parents(".row").children(".id").text();
				var index = isExist(_id, _products);
				_products.splice(index, 1);
				$.cookie("products", _products, {expires:10});
				$(this).parents(".row").remove();
				if (_products.length === 0) {
					location = "http://127.0.0.1:8080/index.html";
				}
				calcTotal();
			});
			$(".cart_body").on("click", ".add, .minus", function(){
				var _row = $(this).parents(".row");
				var _amount = _row.find(".amount").val();
                console.log(_amount);
				if ($(this).is(".add")) {
					_amount++;
				} else {
					if (_amount <= 1)
						return;
					_amount--;
				}			
				var id = _row.children(".id").text();
				var index = isExist(id, _products);
				_products[index].amount = _amount;
				$.cookie("products", _products, {expires:10});
				_row.find(".amount").val(_amount);
				var _price = _row.children(".price").text();
				_row.children(".sub").text(_price * _amount);
				calcTotal();
			});
			var oldAmount = 0;
			$(".cart_body .amount").focus(function(){
				oldAmount = $(this).val();
			}).blur(function(){
				var _val = $(this).val();
				if(!/^[1-9]\d*$/.test(_val)) { 
					$(this).val(oldAmount);
					return;
				}
				var _row = $(this).parents(".row");
				var id = _row.children(".id").text();
				var index = isExist(id, _products);
				_products[index].amount = _val;
				$.cookie("products", _products, {expires:10});
				var _price = _row.children(".price").text();
				_row.children(".sub").text(_price * _val);
				calcTotal();
			});
			$("#chk_all").click(function(){
				$(".chk_prod").prop("checked", $(this).prop("checked"));
				calcTotal();
			});
			$(".row .chk_prod").click(function(){
				var b = $(".chk_prod:checked").length == $(".chk_prod").length;
				$("#chk_all").prop("checked", b);
				calcTotal();
			});
			function calcTotal() {
				var sum = 0;
				$(".chk_prod:checked").each(function(){
					var _row = $(this).parents(".row");
					sum += Number(_row.children(".sub").text());
				});
				$(".foot .total").text(sum);
			}
			function isExist(id, products) {
				for (var i = 0, len = products.length; i < len; i++) {
					if (products[i].id == id)
						return i;
				}
				return -1;
			}
		}
	});
});



