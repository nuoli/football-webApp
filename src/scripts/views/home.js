var homeTpl=require("../templates/home.string");
var util=require("../util/util");

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
        	vm.livedata=[];
		}
	}],
	// 初始化
	/*init:{
       vm:null,
       //livelistArr:[],
      // homeSlider:null,
      // hotSlider:null,
       //detailId:"",
       //flag:0,
       dataformat:function(data){
          var tempArr = [];
          for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
              tempArr[i] = [];
              tempArr[i].push(data[2*i]);
              tempArr[i].push(data[2*i+1]);
          }
          return tempArr;
       }
	},*/
	init:{
		vm:null,
		livelistArr:[],
		dataformat:function(data){
			var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[2*i]);
				tempArr[i].push(data[2*i+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			// 获取视图
		   var that = this;
			// 获取vm
		   that.vm = this.getVM();
			$.ajax({
				//url:"/footballApps/mock/livelist.json",
				url:"/api/getLivelist.php",
				type:"get",
				data:{
               	   	rtype:"origin"
             	},
               success:function(result){
                  var data = result.data;
                  that.vm.livedata= that.dataformat(data);
                 
               },
               error:function(){
               	   console.log("请求失败");
               }
			})			
		},
		show:function(){	
			var that = this;
 			that.vm = this.getVM();		
			var homeSwiper = new Swiper('.swiper-container', {
				//autoplay: 5000,//可选选项，自动滑动
				//loop:false,
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					var tags=$("#title li");
					util.setFocus(tags.eq(index));
				}				
			});
			var contentSwiper = new Swiper('#swiper-content', {
				//autoplay: 5000,//可选选项，自动滑动
				onSlideChangeStart:function(swiper){
					var index=swiper.activeIndex;
					var tags=$("#nav-title li");
					util.setFocus(tags.eq(index));
				}				
			});

			//下拉刷新 上拉加载
			//获取homeListScroll的属性
			var myScroll=this.widgets.homeListScroll;

      		var scrollSize = 30;
      		//隐藏下拉刷新(.head)的盒子
      		myScroll.scrollBy(0,-scrollSize);

      		//获取盒子中箭头的图片以及当前状态（是否添加了.up的类）
		    var head=$(".head img"),//获取img
		        topImgHasClass=head.hasClass("up");//是否已经有up的类
		    var foot=$(".foot img"),
		        bottomImgHasClass=foot.hasClass("down");
		    myScroll.on("scroll",function(){
		    		//获取当前滚动条的位置
		        	var y=this.y;
		        	console.log(y);
		           	var	maxY=this.maxScrollY-y;
		           		//console.log(maxY+","+y);
		           	//y>0,向下拉的,要刷新,y<0，向上拉
		            if(y>=0){
		                !topImgHasClass && head.addClass("up");
		                return "";
		            }
		            //maxY>0,向上的，要加载
		            if(maxY>=0){
		                !bottomImgHasClass && foot.addClass("down");
		                return "";
		            }
		    })

		    myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		              myScroll.scrollTo(0,-scrollSize);
		              head.removeClass("up");
		        }else if(this.y>=0){
		             head.attr("src","/footballApps/images/ajax-loader.gif");
		            
		            // 下拉刷新
		            $.ajax({
		                //url:"/footballApp/mock/livelist.json",
		                url:"/api/getLivelist.php",
		                type:"get",
		                data:{
		                    rtype:"refresh"
		                },
		                success:function(result){
		                	setTimeout(function(){
		                		that.livelistArr = result.data.concat(that.livelistArr);
			                    that.vm.livedata = that.dataformat(that.livelistArr);

			                    /*var newArr = that.livelistArr.concat(result.data);
			                    that.vm.livedata = that.formatData(newArr);
			                    that.livelistArr = newArr;*/

			                    myScroll.scrollTo(0,-scrollSize);
			                    head.removeClass("up");
			                    head.attr("src","/footballApp/images/arrow.png");	
		                	},1000)
		                    
		                }
		            })
		        }

	        	var maxY=this.maxScrollY-this.y;
	        	var self=this;
	        
	        	if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down")
		        }else if(maxY>=0){
		            foot.attr("src","/footballApp/images/ajax-loader.gif")
		              // 请求加载数据
		              //上拉加载
		              $.ajax({
		                  //url:"/footballApp/mock/livelist.json",
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                      rtype:"more"
		                  },
		                  success:function(result){
		                  		setTimeout(function(){
		                  			that.livelistArr =that.livelistArr.concat(result.data);
				                    that.vm.livedata = that.dataformat(that.livelistArr);

				                    /*var newArr = that.livelistArr.concat(result.data);
				                    that.vm.livedata = that.formatData(newArr);
				                    that.livelistArr = newArr;*/

				                    myScroll.refresh();
				                    myScroll.scrollTo(0,self.y+self.maxScrollY);
				                    foot.removeClass("down");
				                    foot.attr("src","/footballApp/images/arrow.png")
		                  		},1000)
		                      
		                  }
		              })
		        }
	        })
		        
		      



		}
	},
	bindActions:{
		"goto.detail":function(e,data){
           SPA.open("detail",{
               param:data      // open切换视图时传递参数
           });
       	},
       	
	}
})
