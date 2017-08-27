/*
 验证方法
 */

function Validate() {
	//验证手机号码
	this.correctPhone = correctPhone;
    //验证 邮箱
	this.correctEmail = correctEmail;
	this.validateSMSCode=VALIDATE_SMS_CODE;
	this.validateIMGode=VALIDATE_IMG_CODE;
    //验证 密码(非空 格式)
	this.isCorrectPass = isCorrectPass;
    //不为空校验
    this.isValidate = isValidate;
    //手机和邮箱账号格式校验
    this.isValidateUsername = isValidate_Phone;
    //只能包含字母和汉字校验
    this.isValidateName = isValidate_name;
    //邮箱格式验证
    this.isValidateEmail = isValidate_Email;
    //密码格式校验
    this.isValidatePassword = isValisate_password;
    //两次密码相同校验
    this.isValidatePassEqual = isValidate_password_equal;
    //密码长度校验
    this.isValidatePassLength = isValidate_password_length;
    //验证是否选中
    this.isValidateCheck = isValidateCheck;
    //验证是否可见(隐藏)
    this.isValidateVisible = isValidateVisible;
    //是否 锁定或 解除 按钮绑定
    this.lockingBtn = lockingBtn;
    this.deblockingBtn = deblockingBtn;
    this.correctAddress = correctAddress;
    this.isValidateAddressLength = isValidate_address_length;
    this.isValidate_nackName = isValidate_nackName;
    this.isValidate_nackNameLength = isValidate_nackNameLength;
    this.add_Address_Validate = add_Address_Validate;
}
/**
 * 验证手机号码
 * @param phone:传入选择器中的字符串
 * @return:true:验证通过,false:验证不通过
 */
function correctPhone(phone,error){
	var mobile = $(phone).val().trim(); 
	//验证手机号是否为空
	if(validate.isValidate(mobile)){
		onError(error,erroeJson.phone);
		return false;
	}
	//验证手机号格式
	if(validate.isValidateUsername(mobile)){
		onError(error,erroeJson.phoneFormat);
		return false;
	}
	return true;
}
/**
 * 验证邮箱
 * @param email
 * @return:true:验证通过,false:验证不通过
 */
function correctEmail(email,error,ids){
	//验证邮箱是否为空
	if(validate.isValidate(email)){
		addRedBorder(ids);
		onError(error,erroeJson.inputEmail);
		return false;
	}
	//验证邮箱格式
	if(validate.isValidateEmail(email)){
		addRedBorder(ids);
		onError(error,erroeJson.inputRightEmail);
		return false;
	}
	return true;
}


/**
 * 验证手机验证码
 */
function VALIDATE_SMS_CODE(telMsg,errorId,ids){
	if(validate.isValidate(telMsg)){
		addRedBorder(ids);
    	onError(errorId,"<i></i>"+erroeJson.mobileCode+"");
        return false;
    }else{
    	removeRedBorder(ids);
    	$(errorId).html("<i></i>");
    	return true;
    }
}
/**
 * 验证密码
 * @param password
 * @returns {Boolean}
 */
function isCorrectPass(password,error){
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

/**
 * describer: 锁定按钮 不能触发点击事件
 * parameter: id-属性对象 选择器
 */
function lockingBtn(id) {
    //锁定状态
    $(id).attr("disabled",true);
}
/**
 * describer: 解除 锁定按钮 能触发点击事件
 * parameter: id-属性对象 选择器
 */
function deblockingBtn(id,arguments) {
	for (var i = 0; i < arguments.length; i++) {
		clearError(arguments[i]);
	}
	//锁定状态
	$(id).attr("disabled",false);
}

/**
 * describer: 不为空校验
 * parameter: id-属性对象val()值
 */
function isValidate(id) {
    if (!id) {
        //为空返回true
        return true;
    }
    return false;
}

/**
 * 勾选状态
 * parameter: check-属性对象 选择器
 */
function isValidateCheck(check) {
    if (!$(check).is(':checked')) {
        //未选中 返回true
        return true;
    }
    return false;
}
/**
 * 是否可见
 * *parameter: imgIcon-属性对象 选择器
 */
function isValidateVisible(imgIcon) {
    if ($(imgIcon).is(':visible')) {
        //可见返回true
        return true;
    }
    return false;
}
/**
 * describer: 手机格式校验
 * parameter: ids1-属性对象 val()值
 */
function isValidate_Phone(ids1) {
    var tel = /^1\d{10}$/;
    if (ids1 && !(tel.test(ids1))) {
        //不符合格式 返回true
        return true;
    }
    return false;
}
/**
 * describer: 邮箱账号格式校验
 * parameter: ids1-属性对象 val()值
 */
function isValidate_Email(ids1) {
    var email = /^[A-Za-z0-9\u4e00-\u9fa5\_\-\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (ids1 && !email.test(ids1)) {
        //不符合格式 返回true
        return true;
    }
    return false;
}
/**
 * describer: 昵称格式校验
 * parameter: ids1-属性对象 val()值
 */
function isValidate_nackName(isd1){
	var nackName = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
	if (!nackName.test(isd1)) {
		$("#hintText").html(erroeJson.nackNameFomatError);
		return true;
	}
	return false;
}
/**
 * describer: 昵称非空校验
 * parameter: ids1-属性对象 val()值
 */
function isValidate_nackNameLength(isd1){
	if(!isd1){
		$("#hintText").html(erroeJson.lengthNackNameLength);
		return true;
	}
	return false;
}
/**
 * describer: 密码格式校验
 * parameter: ids1-属性对象val()值
 */
function isValisate_password(ids1) {
    var reg = /^(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[\!\@\#\$\^\&\*\-\_])|(?=.*\d)(?=.*[\!\@\#\$\^\&\*\-\_])[a-zA-Z\d\!\@\#\$\^\&\*\-\_]+$/;
    if (ids1 && !(reg.test(ids1))) {
        //不符合格式 返回true
        return true;
    }
    return false;
}
/**
 * describer: 密码长度校验
 * parameter: ids1-属性对象val()值
 */
function isValidate_password_length(ids1) {
    if (ids1 && (ids1.length < 6 || ids1.length > 20)) {
        //不符合长度 返回true
        return true;
    }
    return false;
}
function isValidate_address_length(ids) {
	if ($(ids).val() && ($(ids).val().length > 30)) {
		//不符合长度 返回true
		return true;
	}
	return false;
}

/**
 * describer: 只能包含字母和汉字校验
 * parameter: ids1-输入值
 */
function isValidate_name(ids1) {
    var val = /^([A-Za-z]|[\u4E00-\u9FA5])+$/;
    if (ids1 && !(val.test(ids1))) {
        //不符合格式 返回true
        return true;
    }
    return false;
}
/**
 * describer: 两次密码相同校验
 * parameter: ids1-密码 ids2 再次输入密码 val()值
 */
function isValidate_password_equal(ids1,ids2) {
    if (ids1 && ids2 && (ids1 != ids2)) {
        //不相同返回true
        return true;
    }
    return false;
}
var validate = new Validate();

/*
 显示错误信息 集合
 */
var erroeJson = {
    user:"账号格式有误",
    email:"请输入正确的邮箱",
    username:"请输入账号",
    password:"请输入密码",
    pass:"请再次输入密码",
    error:"帐号或密码错误",
    errorCode:"帐号与验证码不匹配",
    sms:"请输入验证码",
    equal:"两次密码输入不一致",
    length:"密码长度只能在6-20个字符间",
    character:"密码只能由数字,字母和!@#$^&*-_组合",
    mobileCode:"请输入手机校验码",
    systemBusy:"系统繁忙",
    inputEmail:"请输入邮箱",
    inputRightEmail:"请输入正确的邮箱",
    argument:"请阅读并同意协议",
    empty:"密码不能为空",
    phone:"手机号码不能为空",
    phoneFormat:"请输入正确的手机号码",
};
