// 关键字搜索
$("#searchBtn").on("click", function () {
    var keywordStr = "";
    var val = $("#searchKeyWord").val();
    if (val == "" || val == undefined || val == null) {
        keywordStr = $("#searchKeyWord").attr("placeholder");
    } else {
        keywordStr = $("#searchKeyWord").val();
    }
    tool.selectCommodityFormSubmit(1, keywordStr, "", "", "C", "", "", "");
});

// 关键字 isDefault = false
$(".comdFilterByKeyWord").on("click", function () {
    var keywordStr = $(this).attr("id");
    tool.selectCommodityFormSubmit(1, keywordStr, "", "", "C", "", "", "");
});

// searchPage 中间的搜索框
$("#searchBtnForNoDataPage").on("click", function () {
    var keywordStr = $("#searchKeyWordForNoDataPage").val();
    tool.selectCommodityFormSubmit(1, keywordStr, "", "", "C", "", "", "");
});

// 主页菜单搜索
$(".comdFilterSearch").on("click", function () {
    var catgCode = $(this).attr("id");
    var selectedCatgStr = "catg:" + catgCode;
    tool.selectCommodityFormSubmit(1, "", "", selectedCatgStr, "C", "", "", "");
});