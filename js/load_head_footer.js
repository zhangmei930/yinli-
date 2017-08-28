define(["jquery"],function($){
	$.ajax({
		type : "get",
		url : "/html/include/header.html",
		url : "/html/include/footer.html",
		success : function(data){
			$(data).appendTo(".header");
			$(data).appendTo(".footer");
			}			
	});
});
