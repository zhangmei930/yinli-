define(["jquery"],function($){
	$.ajax({
		type : "get",
		url : "/html/include/header.html",
		success : function(data){
			
			$(data).appendTo(".header");
			}			
	});
});
