var guideTpl=require("../templates/guide.string");
SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{
		beforeShow:function(){

		},
		show:function(){
				var mySwiper = new Swiper('.swiper-container', {
				//autoplay: 500,//可选选项，自动滑动
				loop:false
			})
		}
	},
	bindActions:{
		"go.index":function(){
			//console.log("hi")
			SPA.open("index");
		}
	}
})