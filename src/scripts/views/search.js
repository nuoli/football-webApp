var searchTpl=require("../templates/search.string");
SPA.defineView("search",{
	html:searchTpl,
	plugins:["delegated"],
	/*bindEvents:{
		show:function(){
			var fxScroll=this.widgets.fxScroll;
			fxScroll.on("scroll",function(iscroll){
                if(Math.abs(this.y)>=200){
                   if($(".m-search").next(".m-search-menu").length>0){
                      ;
                   }else{
                   	   $(".m-search").after($(".m-search-menu").clone(true).addClass("fixed"));
                   }
                }else{
                	$(".m-search-menu.fixed").remove();
                }
			})
		}
	},*/
	bindActions:{
      "go.back":function(){
         this.hide()
      }
  }
})