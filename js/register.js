require(["config"], function(){
	require(["jquery", "load"], function(){
		$(".regis").click(function(){
			var isExist = true; // 标记输入的用户名是否存在
			// 用户名以字母开头，可包含数字字母下划线字符，长度在4到20位之间
			function ckUsername() {
				var result = /^1[3,4,5,7,8]\d{9}$/.test($("#username").value);
				$("#username_info").innerHTML = "";
				if (!result)
					$("#username_info").innerHTML = "用户名格式有误";
				return result;
			}
			$("#username").blur(function(){
				// 用户名文本框失去焦点，首先格式			验证格式是否正确，再验证用户名是否已被占用
				// 格式
				if(!ckUsername())
					return;
				// 是否被占用，使用 ajax
				// a. 创建核心对象
				var xhr = new XMLHttpRequest();
				// b. 建立连接(打开连接)
				xhr.open("get", "check.php?username=" + this.value, true);
				// c. 发送请求
				xhr.send();
				// d. 处理响应
				xhr.onreadystatechange = function(){
					if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
						if (xhr.status === 200) { // OK，正常请求到资源
							// 获取响应数据
							var data = xhr.responseText;
							// 数据处理逻辑
							// console.log(data);
							data = JSON.parse(data);
							if (data.status === 0) {
								$("#username_info").innerHTML = "用户名已存在，请重新选择新用户名";
								isExist = true; // 标记用户存在
							} else {
								$("#username_info").innerHTML = "用户名可用";
								isExist = false; // 标记用户不存在
							}
						}
					}
				}
		    )};
			// 密码可以是任意字符，长度在6-20位之间
			function ckPassword() {
				var result = /^.{6,20}$/.test($("#password").value);
				$("#password_info").innerHTML = "";
				if (!result)
					$("#password_info").innerHTML = "密码格式有误";
	
				return result;
			}
			$("#password").onblur = ckPassword;
			// 再次输入密码
			function ckRepassword() {
				var result = /^.{6,20}$/.test($("#Repassword").value);
				if (ckPassword() === ckRepassword())
				    $("Repassword_info").innerHTML = "";
				else
					$("Repassword_info").innerHTML = "密码不一致，请重新输入";
				return;
			}
			$("#Repassword").onblur = ckRepassword;
	        //手机验证码
	        
			// 表单提交事件
			$("form")[0].onsubmit = function(e){
				e = e || event;
				// 阻止表单的提交
				e.preventDefault ? e.preventDefault() : e.returnValue = false;
	
				if (!(ckUsername() && ckPassword() && ckCid()) || isExist){
					return;
				}
	
				// 向服务器提交注册用户信息：ajax
				// 1. 创建核心对象
				var xhr = new XMLHttpRequest();
				// 2. 建立连接
				xhr.open("post", "register.php", true);
				// 3. 发送请求
				var queryString = "username=" + $("#username").value + "&password=" + $("#password").value + "&cid=" + $("#cid").value;
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xhr.send(queryString);
				// 4. 处理响应
				xhr.onreadystatechange = function(){
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var data = xhr.responseText;
							data = JSON.parse(data);
							/*if (data.status === 1) {
								// 将注册成功的用户信息保存到 cookie 中
								setCookie("user", JSON.stringify(data.user));
								location = "success.html";
							}*/
							if (data.status === 1) {
								var queryString = `username=${data.user.username}&nickname=${data.user.nickname}&score=${data.user.score}&level=${data.user.level}`;
								location = "success.html?" + queryString;
							}
						}
					}
				}
			}
		})
   });
});