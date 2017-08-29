require(["config"], function(){
	require(["jquery", "load"], function(){
		correctPass($(".pawd"),)
        function correctPass(password,error){
			//验证密码是否为空
			if(validate.isValidate(password)){
				onError(error,erroeJson.password);
				return false;
			}
			//验证密码长度
			if(validate.isValidatePassLength(password)){
				onError(error,erroeJson.length);
				return false;
			}
			//验证密码格式
			if(validate.isValidatePassword(password)){
				onError(error,erroeJson.character);
				return false;
			}
			return true;
		}
	});
});


function correctRepeatPass(password,repeatPass,error){
	//验证重复密码是否为空
	if(validate.isValidate(repeatPass)){
		onError(error,erroeJson.pass);
		return false;
	}
	//验证两次密码是否一致
	if(validate.isValidatePassEqual(password,repeatPass)){
		onError(error,erroeJson.equal);
		return false;
	}
	return true;
}
/**
 * 验证验证码
 * @param verifyCode
 * @returns {Boolean}
 */
function correctCode(verifyCode,error){
	//验证验证码是否为空
	if(validate.isValidate(verifyCode)){
		onError(error,erroeJson.sms);
		return false;
	}
	return true;
}
/**
 * 验证勾选状态
 * @param checkarg
 * @returns {Boolean}
 */
function correctCheck(checkarg,error){
	//是否勾选
	if(validate.isValidateCheck(checkarg)){
		onError(error,erroeJson.argument);
		return false;
	}
	return true;
}

//savedRequest.getRedirectUrl() 不为null, 跳转到refer
function jumpRefer(url){
	if(url.indexOf("customer/index") != -1){
		jumpPage(url);
	}else{
		window.location.href = url;
	}
}

/**
 * 登录注册事件
 */
$(function(){
	/****************************************************点击事件***************************************************************/
	//手机密码登录  
	$("#log_pass").on("click", function () {
		// 图片验证码缓存
		var imgSessionValue = $("#imgSessionValue").val();
		//手机号
		var username = $.trim($("#username").val());
		//密码
		var password = $("#password").val();
		var base = new Base64();
		var encodeStr = base.encode(password);
		//错误隐藏域
		var error = "#pass-error";
		var imgIcon = "#sms_img";
		//是否选中 1选中，0未选中
		if(validate.isValidateCheck("#automate")){
			pitchStatus = 0;
		}else {
			pitchStatus = 1;
		}
		
		//点击事件的计数
		arguments.callee.num = arguments.callee.num ? arguments.callee.num : 0;
		if(correctPhone("#username",error)&&correctPass(password,error)){
			//计数
			arguments.callee.num++;
			$("#loginTimes").val(arguments.callee.num);
			var url="" + realPath + "login";
			if(url.indexOf("ylfood.com") != -1)
				url = url.replace("http","https").replace(":80","");
			if (arguments.callee.num < 4 && (imgSessionValue == null || imgSessionValue == "") ) {
				clearError(error);
				//前三次输入ajax 函数
				tool.ajaxPostSubmit(url, 
					{"username":username,"password":encodeStr,"validateBy":"byPassword","pitchStatus":pitchStatus},
					function(data) {
						if(data.status == 'success') {
							//登录成功，跳转到商品页面
							jumpRefer(data.result);
						}else if(data.status == "error") {
							onError(error,data.errors[0].error);
							//第三次点击错误后，提前加载验证码
							if($("#loginTimes").val() >= 3) {
								showImg(imgIcon,"#auto_login",error,"#checkImg",erroeJson.sms);
							}
						}
					});
			}else{
				//输错三次后加载验证码登陆
				var cod = $("#code").val();
				if(validate.isValidateVisible(imgIcon) && cod){
					clearError(error);
					// 不为空 验证 ajax调用
					tool.ajaxPostSubmit(url, 
						{"username":username,"password":encodeStr,"imageVerifyCode":cod,"validateBy":"byPassword","pitchStatus":pitchStatus},
						function(data) {
							if(data.status == 'success') {
								//登录成功，跳转到商品页面
								jumpRefer(data.result);
							} else if(data.status == 'error') {
								onError(error,data.errors[0].error);
							} else {
								onError(error,erroeJson.error);
							}
					});
				}else{
					onError(error,erroeJson.sms);
					return false;
				}
			}
			
		}
	});

    //注册
    $("#reg_btn").on("click",function(){
    	//手机号
		var username = $.trim($("#reg_phone").val());
		//密码
		var password = $("#reg_password").val();
		var base = new Base64();
		var encodeStr = base.encode(password);
		//重复密码
		var repeatPass = $("#re_password").val();
		//验证码
		var verifyCode = $("#re_msg").val();
		//勾选
		var checkarg = "#checkarg";
		//错误隐藏域
		var error = "#reg-error";
		var url= "" + realPath + "register";
		if(url.indexOf("ylfood.com") != -1)
			url = url.replace("http","https").replace(":80","");
		if(correctPhone("#reg_phone",error)&&correctPass(password,error)&&correctRepeatPass(password,repeatPass,error)&&correctCode(verifyCode,error)&&correctCheck(checkarg,error)){
			tool.ajaxPostSubmit(url, 
				{"mobilePhoneNumber":username,"password":encodeStr,"verifyCode":verifyCode},
				function(result) {
					//缓存状态
					var status = (result['status']);
					if(status == 'error') {
						onError(error,result.errors[0].error);
						return false;
					};
					if(status == 'success') {
						jumpRefer(result.result);
					}
				});
		}
	});

    
    //获取注册手机验证码
    $("#reg_get").on("click", function () {
    	//手机号
		var username = $.trim($("#reg_phone").val());
		var error="#reg-error";
		var url="" + realPath + "register/SMSVerifyCode";
		if(url.indexOf("ylfood.com") != -1)
			url = url.replace("http","https").replace(":80","");
		if(correctPhone("#reg_phone",error)){
			tool.ajaxGetSubmit(url, 
				{"mobilePhoneNumber":username},
				function(result) {
					//缓存状态
					var status = (result['status']);
					if(status == 'error') {
						onError(error,result.errors[0].error);
					}else {
						getSMS($("#reg_get"));
					};
				});
		}
    });
    //手机+验证码登录
    $("#log_msg").on("click",function(){
    	//手机号
		var username = $.trim($("#log_username").val());
		//验证码
		var verifyCode = $("#log_password").val();
		var error="#mes-error";
		var url= "" + realPath + "/login";
		if(url.indexOf("ylfood.com") != -1)
			url = url.replace("http","https").replace(":80","");
		if(correctPhone("#log_username",error)&&correctCode(verifyCode,error)){
			tool.ajaxPostSubmit(url, 
				{"username":username,"msgVerifyCode":verifyCode,"validateBy":"byVerifyCode"},
				function(data) {
					if(data.status == 'success') {
						//登录成功，跳转到地址填写栏
						jumpRefer(data.result);
					} else if(data.status == "error") {
						onError(error,data.errors[0].error);
					} else {
						onError(error,erroeJson.errorCode);
					}
				});
		}
    });
    
   //获取手机登录验证码
   $("#land_get").on("click", function () {
	   	//手机号
		var username = $.trim($("#log_username").val());
		var error="#mes-error";
		var url= "" + realPath + "/security/smsVerifyCode";
		if(url.indexOf("ylfood.com") != -1)
			url = url.replace("http","https").replace(":80","");
		if(correctPhone("#log_username",error)){
			tool.ajaxPostSubmit(url, 
				{"mobilePhoneNumber":username},
				function(result) {
					//缓存状态
					var status = (result['status']);
					if(status == 'success') {
						getSMS($("#land_get"));
					} else {
						onError(error,result.errors[0].error);
					};
				});
		}
   });

/****************************************************失焦验证***************************************************************/
 //手机号+密码登录失焦验证
 $(".sp-log").on("blur", function () {
	   var username=$.trim($("#username").val());
	   var password=$("#password").val();
	   var error="#pass-error";
	   var pass="#log_pass";
	 if(this){
		 //手机号
		 if(!validate.correctPhone("#username",error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(pass);
			 return false ;
		 }
		 //密码
		 if(!correctPass(password,error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(pass);
			 return false;
		 }
	 }
 });
 //手机号聚焦
 $(".sp-log").on("focus",function(){
	   validate.deblockingBtn("#log_pass",["#pass-error"]);
 });
 //手机号+验证码登录失焦验证
 $(".sp-log-code").on("blur", function () {
	   var username=$.trim($("#log_username").val());
	   //验证码
	   var code=$("#log_password").val();
	   //错误信息隐藏域
	   var error="#mes-error";
	   //提交按钮
	   var logBan="#log_msg";
	   
		 if(this){
			 //手机号
			 if(!validate.correctPhone("#log_username",error)){
				 //错误时 登录按钮不能触发点击事件
				 validate.lockingBtn(logBan);
				 return false ;
			 }
			 //验证码
			 if(!correctCode(code,error)){
				 //错误时 登录按钮不能触发点击事件
				 validate.lockingBtn(logBan);
				 return false;
			 }
		 }
 });
 //手机验证码登录聚焦
 $(".sp-log-code").on("focus",function(){
	   validate.deblockingBtn("#log_msg",["#mes-error"]);
 });
 
 //注册失焦
 $(".sp-register").on("blur", function () {
	//手机号码
	var phone=$.trim($("#reg_phone").val());
	//密码
	var regPassword=$("#reg_password").val();
	//二次密码
	var rePassword=$("#re_password").val();
	//验证码
	var code=$("#re_msg").val();
	//勾选
	var checkarg="#checkarg";
	var error="#reg-error";
	var btn="#reg_btn";
	 if(this){
		 //手机号
		 if(!validate.correctPhone("#reg_phone",error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(btn);
			 return false ;
		 }
		 //密码
		 if(!correctPass(regPassword,error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(btn);
			 return false;
		 }
		 //二次密码
		 if(!correctRepeatPass(regPassword,rePassword,error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(btn);
			 return false;
		 }
		 //验证码
		 if(!correctCode(code,error)){
			 //错误时 登录按钮不能触发点击事件
			 validate.lockingBtn(btn);
			 return false;
		 }
		 //勾选状态
	     if(!correctCheck(checkarg,error)){
		   //错误时 登录按钮不能触发点击事件
		   validate.lockingBtn(btn);
		   return false;
	     }
	 }
 });
 	//聚焦
 	$(".sp-register").on("focus",function(){
	   validate.deblockingBtn("#reg_btn",["#reg-error"]);
   });
});