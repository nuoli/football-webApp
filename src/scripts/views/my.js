var myTpl=require("../templates/my.string");
SPA.defineView("my",{
	html:myTpl,
	plugins:["delegated"],
})
