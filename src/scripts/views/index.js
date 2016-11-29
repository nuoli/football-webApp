//引入模板
var indexTpl=require("../templates/index.string");

/*var wrapper=document.getElementById('index');
var content=wrapper.innerHTML;
wrapper.innerHTML=content+indexTpl;*/
//定义视图，“index”是视图名称
SPA.defineView("index",{
	//定义模板
	html:indexTpl,
	plugins:["delegated"],
	modules:[{
		name:"content",//子视图的名称
		defaultTag:"home",//默认视图
		views:["home","search","my","quit"],//子视图集
		container:".m-wrapper"//放置子视图容器
	}],
	bindActions:{
		"switch.tabs":function(e,data){
			
			this.modules.content.launch(data.tag)
		}
		/*"goto.search":function(){
			SPA.open("search")
		}*/
	}
})