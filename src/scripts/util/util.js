var util={
	setFocus:function(el){
		el.addClass("active").siblings().removeClass("active");
	}
}
module.exports=util;//将util对象暴漏出去