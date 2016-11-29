var quitTpl=require("../templates/quit.string");
SPA.defineView("quit",{
	html:quitTpl,
	plugins:["delegated"],
})