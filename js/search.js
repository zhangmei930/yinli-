function search(){
	var res = getCookie("name");
    var arr = unescape(getCookie("name")).split(',');
    if(arr.length > 10){
        arr.pop();
    }
    arr = arr.join();
    var val = $(".txt").val();
    if(val.indexOf("<") > -1 || val.indexOf("<") > -1){
    	return;
    }
    if(res !== undefined){
        val = val + "," + arr;
    }
    var _val = [];
    val = val.split(',');
    for(var i = 0; i < val.length; i++){
		if(_val.indexOf(val[i]) < 0){
			_val.push(val[i]);
		}
	}
    _val = _val.join();
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + 10*24*3600*1000); 
    document.cookie = 'name=' + escape(_val) + ';expires=' + oDate.toGMTString() + ';path=/';
}
$(".sub").on("click",search);

var res = unescape(getCookie("name")).split(',');
var val = $(".txt").val();

//键盘事件 key== 40 (向下) key == 38 (向上) key == 13 (回车)
$(".txt").keyup(function(event) {
var key = event.keyCode;
if (key == 40) {
	console.log();
	if($("#get_cookie li").length == 0){
		return;
	}else{
		var len = $("#get_cookie li").length;
		var index = $("#get_cookie .choose_this").index();
		index = index + 1;
		if (index > len - 1) index = 0;
		$(".association_box").removeClass("sp-hide");
		$("#get_cookie li").removeClass("choose_this");
		$("#get_cookie li").eq(index).addClass("choose_this");
		$(".txt").val($("#get_cookie li").eq(index).text());
	}
} else if (key == 13) {
	search(); //cookie记录
    var tex = $(".txt").val();
	tool.selectCommodityFormSubmit(1, tex, "", "", "C", "", "", "");
} else if (key == 38) {
	if($("#get_cookie li").length == 0){
		return;
	}else{
		var len = $("#get_cookie li").length;
		var index = $("#get_cookie .choose_this").index();
		index = index - 1;
		if (index < 0)
			index = len - 1;
		$(".association_box").removeClass("sp-hide");
		$("#get_cookie li").removeClass("choose_this");
		$("#get_cookie li").eq(index).addClass("choose_this");
	    $(".txt").val($("#get_cookie li").eq(index).text());
	}
} else{
	// 输入
	var _thisVal = $(this).val();
	if (res[0] == "undefined"){
		$("#get_cookie").empty();
		$(".association_box").addClass("sp-hide");
	}else if(_thisVal == "" || _thisVal == null){
        showCooikeAll();
    } else {
		$(".association_box").removeClass("sp-hide");
		var obj = "";
		$("#get_cookie").empty();
		for ( var i in res) {
			var arr = "";
			if (res[i].indexOf(_thisVal) > -1) {
				arr += "<li>" + res[i] + "</li>";
				obj += arr;
			}
		}
		$("#get_cookie").append(obj);
		var len = $("#get_cookie li").length;
		if (len == 0) {
			$(".association_box").addClass("sp-hide");
		} else {
			$(".association_box").removeClass("sp-hide");
			}
		}
	}
});
//搜索框失去焦点
	function stopPropagation(e){
		if (e.stopPropagation) 
		e.stopPropagation(); 
		else 
		e.cancelBubble = true; 
	} 
	$(document).bind('click',function(){ 
		$(".association_box").addClass("sp-hide");
	}); 
	$('#searchKeyWord').bind('click',function(e){ 
		stopPropagation(e); 
	}); 

//搜索框聚焦
$("#searchKeyWord").focus(function(){
	showCooikeAll();
});
// 点击选中搜索词语(后隐藏历史记录)
$(document).on("click",'#get_cookie li',function(){
    var _thisWord = $(this).text();
    $("#searchKeyWord").val(_thisWord);
    $(".association_box").addClass("sp-hide"); 
    tool.selectCommodityFormSubmit(1,_thisWord,"","","C","","","");
});
    
// 搜索历史 end
var title = $('title').text();