var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
            vm.imgsrc = "";
            vm.title = "";
            vm.id  = "";
            vm.description = "";
            vm.isShowLoading = true;
		}
	}],
	
	bindEvents:{
		show:function(){
			var that = this;
			var vm = this.getVM();
            var param = this.param;
            
			// 获取id
			$.ajax({
				//url:"/footballApp/mock/liveDetail.json",
				url:"/api/getLiveDetail.php",
				type:"get",
				data:{
					id:param.id
				},
				success:function(result){
					var data = result.data;
                    vm.imgsrc =  data.imgsrc;
                    vm.title = data.title;
                    vm.description = data.description;
                    //that.detailId = data.id;
                    //工作中不用写，这是延时调用
                    setTimeout(function(){
                        vm.isShowLoading = false;
                    },1000)
				}
			})
		}
	},
	bindActions:{
		"go.back":function(){
            /*this.hide({
            	detailId:this.detailId
            });*/
            //this是对当前视图的引用
            this.hide();
            
		}
	}
})