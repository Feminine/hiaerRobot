//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {  //author: meizz 
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//京东的定时接口
var JDsetTime = {
	feedid: null,
    // domBox:{
    	// mengban_setBox: $(".mengban_setBox"),
    	// openScroll: $(".openScroll"),
    	// closeScroll: $(".closeScroll"),
    	// setTMOpenbtn: $(".setTMOpenbtn"),
    	// setTMClosebtn: $(".setTMClosebtn")
    // },
    task_nameArr:[],
    toast: function (str) { //toast 报错
        JDSMART.app.toast({
            "message": str
        }, null);
    },
    view_wait: function () {//交互等待动画显示/隐藏
        $('.loader').show();
    },
    hide_wait: function () {
        $('.loader').hide();
    },
    controlDevice: function (command, callback, callerror) {  //控制设备指令
        var _this = this;
        JDSMART.io.controlDevice( // 控制设备接口: 如开关
            command,
            function(suc) {
                if (callback)
                    callback(suc);
            },
            function(error){
                _this.toast(error.errorInfo);
            }
        );
	},
	getFormatedTime: function() {
    	return new Date().Format("yyyy-MM-dd hh:mm");
	}, 
	itemRender: function(item,itemState){
		var _this = this;
		console.log("itemState---->");
		console.log(itemState);
		console.log("itemState----<");
		if(itemState.sataState=="on"){
			$("p[value='btn_tm"+item+"']").addClass("on");
			$("p[value='btn_tm"+item+"']").removeClass("off");
		}else{
			$("p[value='btn_tm"+item+"']").addClass("off");			
			$("p[value='btn_tm"+item+"']").removeClass("on");
		}
		if(itemState.times){
			$("."+item+"Res").text(itemState.times);
		}
		if(itemState.review){
			$("#week_type").text(itemState.review);
		}
		_this.week_xs();
		sessionStorage.clear();
	},
	init: function(){
		var _this = this;
		$(".deleteBtn").click(function(){
			window.history.back();
		});
		$(".timeCancel").click(function(){
			// _this.domBox.mengban_setBox.hide();
			$(".mengban_setBox").hide();
		});
		if( $("p[value='btn_tmOpen']").hasClass("on")){
			$(".openSetting").show();
		}else{
			$(".openSetting").hide();
		}
		$(".setReview").on("change",function(){
			$("p[value='btn_tmReview']").addClass("on");
			$("p[value='btn_tmReview']").removeClass("off");
		});
		var washMode = $(".washSet .mode");
		$(".washSetMore").on("click",function(){
			if($(this).find(".arrowgray").hasClass("arrow_up")){
				washMode.toggle();
				$(".arrowgray").addClass("arrow_down");
				$(".arrowgray").removeClass("arrow_up");
			}else if($(this).find(".arrowgray").hasClass("arrow_down")){
				washMode.toggle();
				$(".arrowgray").addClass("arrow_up");
				$(".arrowgray").removeClass("arrow_down");
			}
		});
		var liSteps = $(".modeSteps .liSteps");
		liSteps.on("click",function(){
			liSteps.removeClass("on");
			liSteps.addClass("off");
			var curvalue = $(this).attr("data-value");
			console.log("获取mode： curvalue: "+curvalue+typeof curvalue);
	
			switch(curvalue){
				case '1':
					liSteps.eq(0).addClass("on");
					liSteps.eq(0).removeClass("off");
					$(".mark_off").hide();
					break;
				case '2':
					liSteps.eq(1).addClass("on");
					liSteps.eq(1).removeClass("off");
					$(".mark_off").show();
					break;
				case '4':
					liSteps.eq(2).addClass("on");
					liSteps.eq(2).removeClass("off");
					$(".mark_off").show();
					break;
				default:
					$(".mark_off").show();
					break;
			}
		});
		$(".funcbtnP").click(function(){
			console.log("funcbtnP click"+$(this).attr("value"));
			var btn = $(this);
			if(btn.hasClass("off")){
				btn.addClass("on");
				btn.removeClass("off");
				btn.attr("data-value",1);
				if(btn.attr("value")=="btn_tmOpen"){
					$(".openSetting").show();
					$(".OpenRes").text($("#appTMOpen").val());
				}
				if(btn.attr("value")=="btn_tmClose"){
					$(".OpenRes").text($("#appTMOpen").val());
					$(".CloseRes").text($("#appTMClose").val());
				}
			}else{
				btn.addClass("off");
				btn.removeClass("on");
				btn.attr("data-value",0);
				if(btn.attr("value")=="btn_tmOpen"){
					$(".openSetting").hide();
					// _this.domBox.openScroll.hide();
					$(".openScroll").hide();
				}
				if(btn.attr("value")=="btn_tmReview"){
					$(".radio").removeAttr("checked");
				}
			}
		});
		$(".setTMOpen").click(function(){
			_this.initShow("open");
			// _this.domBox.openScroll.show();
			$(".openScroll").show();
		});
		$(".setTMClose").click(function(){
			_this.initShow("close");
			// _this.domBox.closeScroll.show();
			$(".closeScroll").show();
		});
		$("#appTMOpen").on("change",function(){
			var text = $(this).val();
			console.log("appTMOpen: "+text); 
			$(".OpenRes").text(text);
		});
		$("#appTMClose").on("change",function(){
			var text = $(this).val();
			console.log("appTMClose: "+text); 
			$(".CloseRes").text(text);
		});
		$(".openSubmit").click(function(){
			// _this.domBox.openScroll.hide();
			$(".openScroll").hide();
			//并且将值放入Res里面
			$("p[value='btn_tmOpen']").addClass("on");
			$("p[value='btn_tmOpen']").removeClass("off");
			$(".openSetting").show();
		});
		$(".closeSubmit").click(function(){
			// _this.domBox.closeScroll.hide();
			$(".closeScroll").hide();
			//并且将值放入Res里面
			$("p[value='btn_tmClose']").addClass("on");
			$("p[value='btn_tmClose']").removeClass("off");
		});
	},
    GetQueryString: function(param) {  //获取url请求地址的参数
        var request = { 
			QueryString : function(val) { 
			var uri = window.location.search; 
			var re = new RegExp("" +val+ "=([^&?]*)", "ig"); 
			return ((uri.match(re))?(decodeURI(uri.match(re)[0].substr(val.length+1))):''); 
			} 
		} 
			return request.QueryString(param); 
    },
    initShow: function(place){ //初始化任务设置
        var _this = this;
        addOrUpdate=true;
		var ddaa=new Date();
		var hs= ddaa.getHours();
		var ms= ddaa.getMinutes();
		if( parseInt(ms)<10){
		 ms="0"+ms;
		}
		if( parseInt(hs)<10){
		 hs="0"+hs;
		}
		if(place=="open"){
			$("#appTMOpen").val(hs+":"+ms);
			$(".OpenRes").text(hs+":"+ms);
			$("#appTMOpen").mobiscroll().time({
				theme: 'android-ics light', //皮肤样式
				display: 'inline', //显示方式 Inline
				mode: 'scroller', //日期选择模式
				lang: 'zh',
				//  defaultValue: new Date(new Date().setHours(00, 02, 00, 0)),
				minDate: new Date(new Date().setHours(00, 00, 0, 0)),
				maxDate: new Date(new Date().setHours(23, 59, 0, 0)),
				setText: '', //确认按钮名称
				cancelText: '',//取消按钮名籍我
				showLabel:"true",//
				hourText: "时",//
				minuteText:"分",//
			});
		}else if(place=="close"){
			$("#appTMClose").val(hs+":"+ms);
			$(".CloseRes").text(hs+":"+ms);
			$("#appTMClose").mobiscroll().time({
				theme: 'android-ics light', //皮肤样式
				display: 'inline', //显示方式 Inline
				mode: 'scroller', //日期选择模式
				lang: 'zh',
				//  defaultValue: new Date(new Date().setHours(00, 02, 00, 0)),
				minDate: new Date(new Date().setHours(00, 00, 0, 0)),
				maxDate: new Date(new Date().setHours(23, 59, 0, 0)),
				setText: '', //确认按钮名称
				cancelText: '',//取消按钮名籍我
				showLabel:"true",//
				hourText: "时",//
				minuteText:"分",//
			});
		}
		
		$("#week_type").text("每天");
		$("#week_str").val("_*_*_*_*");
		// $("#renwuName").val("新任务"); 
	},
	get_expreee: function(typ){   //解析定时类型
	 var s = typ.trim().split('_');
	        var t = new Object();
	        t.minute = s[0] < 10 ? '0' + s[0] : s[0];
	        t.hour = s[1] < 10 ? '0' + s[1] : s[1];
	        t.day = s[2];
	        t.april = s[3];
	        t.week = s[4];
	        t.year = s[5];
	        t.type = null;
	        if (t.day == '*' && t.april == '*' && t.week == '*' && t.year == '*') {
	            t.type = 4;
	            //return t;//4 每天
	        } else if (t.april == '*' && t.week == '*' && t.year == '*') {
	            t.type = 3;
	            //return t;//3;//每月 几号
	        } else if (t.day == '*' && t.april == '*' && t.year == '*') {
	            t.type = 2;
	        } else {
	            t.type = 1;
	        }
	        return t;		 
	},
	week_xs: function(){  //根据type显示不同的显示
    //获取 type   
		var type_w=$("#week_type").text();
		if(type_w=="每天"){
		   //应显示 
		    $("p[value='btn_tmReview']").addClass("on");
			$("p[value='btn_tmReview']").removeClass("off"); 
			$(".radio").prop("checked",true);
		}else if(type_w=="执行一次"){
		    $(".radio").removeAttr("checked");
			$("p[value='btn_tmReview']").removeClass("on");
			$("p[value='btn_tmReview']").addClass("off");  
		}else if(type_w=="工作日"){
			$(".radio").removeAttr("checked");
			$("p[value='btn_tmReview']").addClass("on");
			$("p[value='btn_tmReview']").removeClass("off");  
			$("#radio_mr_1").prop("checked","checked");
			$("#radio_mr_2").prop("checked","checked");
			$("#radio_mr_3").prop("checked","checked");
			$("#radio_mr_4").prop("checked","checked");
			$("#radio_mr_5").prop("checked","checked");
		}else{
			$(".radio").removeAttr("checked");
		    $("p[value='btn_tmReview']").addClass("on");
			$("p[value='btn_tmReview']").removeClass("off"); 
			$("#radio_3").attr("checked","checked");
			var taaa=type_w.split(' ');
			for(var i=0;i<taaa.length;i++){
			 if(taaa[i]=="周一"){
			   $("#radio_mr_1").prop("checked","checked");
			 }else if(taaa[i]=="周二"){
			   $("#radio_mr_2").prop("checked","checked");
			 }else if(taaa[i]=="周三"){
			    $("#radio_mr_3").prop("checked","checked");
			 }else if(taaa[i]=="周四"){
			    $("#radio_mr_4").prop("checked","checked");
			 }else if(taaa[i]=="周五"){
			    $("#radio_mr_5").prop("checked","checked");
			 }else if(taaa[i]=="周六"){
			    $("#radio_mr_6").prop("checked","checked");
			 }else if(taaa[i]=="周日"){
			    $("#radio_mr_7").prop("checked","checked");
			 }
			} 
		}
	
	},
	save_openSetting: function(){
		// var streams_arr = {};
		var streams_arr = [{"stream_id":"power","stream_value":"1"}];

		if(typeof $(".modeSteps").find(".on").attr("data-value") != "undefined"){
			// streams_arr.mode = $(".modeSteps").find(".on").attr("data-value");
			streams_arr.push({"stream_id":"mode","stream_value": $(".modeSteps").find(".on").attr("data-value")});
		}
		if(streams_arr.mode != null){
			// streams_arr.mark = $("#mark").val();
			streams_arr.push({"stream_id":"mark","stream_value": $("#mark").val()});
		}
		// if($("p[value='btn_hordir']").attr("class").indexOf("on")>=0){
		// 	// streams_arr.hordir = 1;
		// 	streams_arr.push({"stream_id":"hordir","stream_value": "1"});
		// }
		// if($("p[value='btn_scrdisplay']").attr("class").indexOf("on")>=0){
		// 	// streams_arr.scrdisplay = 1;
		// 	streams_arr.push({"stream_id":"scrdisplay","stream_value":"1"});
		// }
		// if($("p[value='btn_voice']").attr("class").indexOf("on")>=0){
		// 	// streams_arr.vioce = 1;
		// 	streams_arr.push({"stream_id":"vioce","stream_value": "1"});
		// }
		
		console.log("开机预设streams_arr--->");
		console.log(streams_arr);
		console.log("开机预设streams_arr----<");
		// for(var i=0;i<streams_arr.length;i++){
			
		// }
		return streams_arr;
	},
	save_week: function(radio_id_mr){   //保存执行方式
		var _this = this;
	    if($("P[value='btn_tmReview']").attr("class").indexOf("on") >= 0){
			var  radio_mr_str=[];
			var  radio_mr_arr=[];
			$('#time_con3 input:checkbox[name="radio_mr"]:checked').each(function(){
			    var radio_id_mr=$(this).attr("id");
				if(radio_id_mr=="radio_mr_1"){
				  radio_mr_str.push(1);
				}else if(radio_id_mr=="radio_mr_2"){
				  radio_mr_str.push(2);
				}else if(radio_id_mr=="radio_mr_3"){
				  radio_mr_str.push(3);
				}else if(radio_id_mr=="radio_mr_4"){
				  radio_mr_str.push(4);
				}else if(radio_id_mr=="radio_mr_5"){
				  radio_mr_str.push(5);
				}else if(radio_id_mr=="radio_mr_6"){
				  radio_mr_str.push(6);  
				}else if(radio_id_mr=="radio_mr_7"){
				  radio_mr_str.push(7);
				}
			});
			if(radio_mr_str.length>0){
				radio_mr_str = radio_mr_str.sort(function(a,b){return a-b;});
				for(var i=0;i<radio_mr_str.length;i++){
					if(radio_mr_str[i]==1){
					   radio_mr_arr.push("周一");
					}else if(radio_mr_str[i]==2){
					   radio_mr_arr.push("周二");
					} if(radio_mr_str[i]==3){
					   radio_mr_arr.push("周三");
					} if(radio_mr_str[i]==4){
					   radio_mr_arr.push("周四");
					} if(radio_mr_str[i]==5){
					   radio_mr_arr.push("周五");
					} if(radio_mr_str[i]==6){
					   radio_mr_arr.push("周六");
					} if(radio_mr_str[i]==7){
					   radio_mr_arr.push("周日");
					}
				}
				$("#week_str").val("_*_*_"+radio_mr_str.join(',')+"_*");
					if($("#week_str").val()=="_*_*_1,2,3,4,5,6,7_*"){
					  $("#week_type").text("每天");
					   $("#week_str").val("_*_*_*_*");
					}else if($("#week_str").val()=="_*_*_1,2,3,4,5_*"){
					  $("#week_type").text("工作日");
					}else{
					  $("#week_type").text(radio_mr_arr.join(' '));
					}
			}else{
				alert("请选择星期");
				_this.toast("请选择星期");
				return ;
			}
		}else{
		//执行一次
			var new_time=new Date();
			$("#week_str").val("_"+new_time.getDate()+"_"+(new_time.getMonth()+1)+"_*_"+new_time.getFullYear());
			$("#week_type").text("执行一次");
		}
	},
	addTask: function(express_str,streas_arr,task_name){    //添加定时\
		var _this = this;
  //       var   appTime_dingshi=$("#appTime").val();//定时时间
		// var arr_t=appTime_dingshi.split(':');
		// var express_str=parseInt(arr_t[1])+"_"+parseInt(arr_t[0])+$("#week_str").val();
        var  app_time = _this.getFormatedTime(); //定时时间
        console.log("app_time:"+app_time);
	    var timed_task = {};
        timed_task.app_time = app_time;
        timed_task.task_name = task_name ? task_name:"新任务";
        timed_task.task_time_express = express_str;
        timed_task.task_express = [{"feed_id": _this.feedid,
                            "stream":streas_arr}];
        timed_task.task_type ='1';
	    timed_task = { "timed_task": JSON.stringify(timed_task) };
        console.log("timed_task---->");
        console.log(timed_task);
		console.log("timed_task----<");
        JDSMART.util.post("service/addTimedTask",timed_task,function (res) {
            console.log("addTask res---->");
            console.log(res);
            console.log("addTask res----<");
            window.history.back();
			  // getAlltask();
			  // fanhui1();
        });
	},
	getAlltask: function(feedid){    	//通过feedid  ,查询用户该设备上的所有定时任务
		var _this = this;
		var str_stask="";
		console.log("getAlltask——————》feedid: "+feedid);
		var feed_ids = { feed_ids: "[" + feedid + "]" };
        JDSMART.util.post("service/getTimedTaskByFeedIds", feed_ids,
            function (res) {
            	console.log("getAlltask-res-->");
            	console.log(res);
            	console.log("getAlltask-res--<"+JSON.stringify(res));
			    try {
		            if (typeof (res) == "string") {
		                res = JSON.parse(res);
		            }
		        } catch (e) {
		            hide_wait();
		            _this.toast("查询云端定时失败！");
		            return;
		        }
				var pase=res.result;
				var sata="off";
				if(pase.length>=1){
					for(var i=0;i<pase.length;i++){
						var flagBreak = false;
						if(pase[i]==null){
							continue;
						}
						//同过匹配相同的名字，获得str是否是时间段任务。
						for(var j=1;j<pase.length;j++){
							if(i==j){break;}
							if(pase[j]==null){continue;}
							var nowName = pase[i].task_name.match(/\d{4}-\d{2}-\d{2}.\d{2}\:\d{2}/).toString(); 
							var compName = pase[j].task_name.match(/\d{4}-\d{2}-\d{2}.\d{2}\:\d{2}/).toString();
							if(nowName==compName){
								var ted_str1,ted_str2;
								var sataOpen="off",sataClose="off";
								var opentaskid = null,closetaskid = null,task_id = null;
								var taskName = pase[i].task_name.match('开') ? "开" : "关" ;
								if(taskName=="开"){
									opentaskid = pase[i].task_id;
									closetaskid = pase[j].task_id;
									ted_str1 = _this.get_expreee(pase[i].task_time_express);
									ted_str2 = _this.get_expreee(pase[j].task_time_express);
								}else{
									ted_str1 = _this.get_expreee(pase[j].task_time_express);
									ted_str2 = _this.get_expreee(pase[i].task_time_express);
									opentaskid = pase[j].task_id;
									closetaskid = pase[i].task_id;
								}
								if(pase[i].task_status=="1"){
									sataOpen="on";   
								}else{
									sataOpen="off";
								}
								if(pase[j].task_status=="1"){
									sataClose="on";   
								}else{
									sataClose="off";
								}
								str_stask = str_stask +'<div class="cardbg timeBox" data-name="'+nowName+'" data-opentaskid="'+opentaskid+'" data-closetaskid="'+closetaskid+'">'
								+'<div class="cardbgbtn"><h3>定时'+i+'<a  class="dele" onClick="itemDele(this.parentNode.parentNode.parentNode)">删除</a></h3></div>'
								+'<div class="timeCard setTimeList" onClick="itemJump(this.parentNode)">'
								+'<div class="cardbgbtn setTMOpenbtn" data-setTMOpenbtn="'+sataOpen+'" data-value="'+ted_str1.hour+':'+ted_str1.minute+'"><span class="nameh3">开机</span>&nbsp;<span class="timeResBox"><em class="timeResHour">'+ted_str1.hour+'</em>:<em class="timeResMinutes">'+ted_str1.minute+'</em></span></div>'
								+'<div class="cardbgbtn setTMClosebtn" data-setTMClosebtn="'+sataClose+'" data-value="'+ted_str2.hour+':'+ted_str2.minute+'"><span class="nameh3">关机</span>&nbsp;<span class="timeResBox"><em class="timeResHour">'+ted_str2.hour+'</em>:<em class="timeResMinutes">'+ted_str2.minute+'</em></span></div>'
								+'<span class="reviewDays reviews">'+_this.week_strGet(ted_str1)+'</span><div class="arrowgray arrow_left" style="top: 28px;"></div></div></div>';
								flagBreak = true;
								pase[i] = null;
								pase[j] = null;
								break;
							}
						}
						if(flagBreak){
							continue;
						}
					}
					for(var i=0;i<pase.length;i++){
						if(pase[i]==null){continue;}
						if(pase[i].task_status=="1"){
							sata="on";   
						}else{
							sata="off";
						}
						var ted=_this.get_expreee(pase[i].task_time_express);
						var ted_str = _this.week_strGet(ted);
						var opentaskid = null,setTMbtn = "";
						closetaskid = null;
						var taskName = pase[i].task_name.match('开') ? "开" : "关" ;
						var task_id = null;
						if(taskName=="开"){
							opentaskid = pase[i].task_id;
							setTMbtn = "setTMOpenbtn";
						}else{
							closetaskid = pase[i].task_id;
							setTMbtn = "setTMClosebtn";
						}
						str_stask = str_stask +'<div class="cardbg timeBox" data-name="'+pase[i].task_name+'" data-opentaskid="'+opentaskid+'" data-closetaskid="'+closetaskid+'">'
						+'<div class="cardbgbtn"><h3>定时'+i+'<a  class="dele" onClick="itemDele(this.parentNode.parentNode.parentNode)">删除</a></h3></div>'
						+'<div class="timeCard setTimeList" onClick="itemJump(this.parentNode)">'
						+'<div class="cardbgbtn '+setTMbtn+'" data-'+setTMbtn+'="'+sata+'" data-value="'+ted.hour+':'+ted.minute+'"><span class="nameh3">'+taskName+'机</span>&nbsp;<span class="timeResBox"><em class="timeResHour">'+ted.hour+'</em>:<em class="timeResMinutes">'+ted.minute+'</em></span></div>'
						+'<span class="reviewSingle reviews">'+ted_str+'</span><div class="arrowgray arrow_left"></div></div></div>';
					}
					$(".no_task").hide();
					$(".timePlace").empty();
					$(".timePlace").append(str_stask);
				}else{
				// $("#page1 .timebox").hide();
					$(".no_task").show();
				}
            });
	},
	week_strGet: function(ted){
		// var ted=_this.get_expreee(task_time_express);
		var ted_str="";
		if(ted.type==1){
			ted_str="执行一次";
		}else if(ted.type==4){
			ted_str="每天";
		}else if(ted.type==2){
			ted_str="";
			var arr_week=ted.week.split(',');
			for(var j=0;j<arr_week.length;j++){
				if(arr_week[j]==1){
				  ted_str=ted_str+"周一 ";
				}else if(arr_week[j]==2){
				  ted_str=ted_str+"周二 ";
				}else if(arr_week[j]==3){
				  ted_str=ted_str+"周三 ";
				}else if(arr_week[j]==4){
				  ted_str=ted_str+"周四 ";
				}else if(arr_week[j]==5){
				  ted_str=ted_str+"周五 ";
				}else if(arr_week[j]==6){
				  ted_str=ted_str+"周六 ";
				}else if(arr_week[j]==7){
				  ted_str=ted_str+"周日 ";
				}
			}
		}
		return ted_str;
	},
	onclc: function(bg,task){	//启用停用开关按钮
	     if($(bg).attr("class").indexOf("on") >= 0){
			 to_or_stop("off",task,function(suc){
			  $(bg).attr("class","btn off");
	           });
		}
		else{
		    to_or_stop("on",task,function(suc){
			  	$(bg).attr("class","btn on");
	        });
		}
	},
	getTimedTaskByTaskIds: function(str){   //查询对应task_id的任务详细信息
		var _this = this;
		var cmd = {"task_ids": '['+str+']'};
		JDSMART.util.post(
			"service/getTimedTaskByTaskIds",cmd,function(res){
				console.log("getTimedTaskByTaskIds result---->");
                console.log(res);
                console.log("getTimedTaskByTaskIds result----<");
                console.log(JSON.stringify(res.result));
				try {
		            if (typeof (res) == "string") {
		                res = JSON.parse(res);
		            }
		        } catch (e) {
		            hide_wait();
		            _this.toast("查询云端定时失败！");
		            return;
		        }
			}
		);
	},
	modifyTimedTask: function(task_id,express_str,streas_arr,task_name){   //修改定时任务
		var _this = this;
		 var cmd = {
            "timed_task": {
                "app_time": _this.getFormatedTime(),
                "task_id": task_id,
                "task_name": task_name,
                "task_time_express": express_str,
                "task_express": [
                    {
                        "feed_id": _this.feedid,
                        "stream": streas_arr
                    }
                ],
                "task_type": 1
            }
        }
		console.log("modifyTimedTask cmd---->");
		console.log(cmd);
		console.log("modifyTimedTask cmd----<");
		JDSMART.util.post("service/modifyTimedTask",cmd,function(res){
				console.log("modifyTimedTask result---->");
                console.log(res);
                console.log("modifyTimedTask result----<");
                window.history.back();
				try {
		            if (typeof (res) == "string") {
		                res = JSON.parse(res);
		            }
		        } catch (e) {
		            _this.hide_wait();
		            _this.toast("修改定时任务失败！");
		            return;
		        }
			}
		);
	},
	removeTimedTask: function(str){   //删除定时任务
		var _this = this;
		var cmd = {"task_ids": "["+str+"]"};
		console.log("cmd---->");
		console.log(cmd);
		console.log("removeTimedTask: "+JSON.stringify(cmd));

		JDSMART.util.post("service/removeTimedTask",cmd,function(res){
				console.log("removeTimedTask result---->");
                console.log(res);
                console.log("removeTimedTask result----<");
                console.log(JSON.stringify(res.result));
                _this.getAlltask(_this.feedid);
				try {
		            if (typeof (res) == "string") {
		                res = JSON.parse(res);
		            }
		        } catch (e) {
		            _this.hide_wait();
		            _this.toast("删除定时任务失败！");
		            return;
		        }
			}
		);
	}
};