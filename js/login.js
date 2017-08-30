require(["config"], function(){
	require(["jquery", "load"], function(){
		
		$(".btnLogin").click(function(){
			$.getJSON("/mock/login.json",function(data){
				if(count){
					var uname = $(".row2_row1_user_2").val();
					var pword = $(".row2_row2_user_2").val();
					for(var i = 0, len = data.length ; i < len ; i++){
						if(data[i]._username === uname && data[i]._password === pword){
							window.location.replace("/index.html");
							$.cookie("loginUser",uname,{expires:1});
						}	
					}
					
					$(".zhuangtailan").text("您输入的账号或者密码有误，请从新输入!")
					$(".zhuangtailan").append("<i class='iconfont icon-gaojing'></i>")
					$(".row2_row1_user_2").val("")
					$(".row2_row2_user_2").val("")
					
				}
				else{
					var uname = $(".row3_row1_user_2").val();
					var pword = $(".row3_row2_user_2").val();
					for(var j = 0, len = data.length ; j < len ; j++){
						if(data[j]._username === uname && data[j]._password === pword){
							window.location.replace("/index.html");
							$.cookie("loginUser",uname,{expires:2});
						}	
					}
					$(".zhuangtailan").text("您输入的账号或者密码有误，请从新输入!")
					$(".row3_row1_user_2").val("")
					$(".row3_row2_user_2").val("")
				}
			})
		})
   });
});