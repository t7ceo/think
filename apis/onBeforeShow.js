String.prototype.replaceAll = replaceAll;
function replaceAll(str1, str2){
	var strTemp = this;
	strTemp = strTemp.replace(new RegExp(str1, "g"), str2);
	return strTemp;
}


//====================================================
//제일 처음 페이지 관련 처리
//====================================================
	$(document).on("pagecreate", "div", function(e,u){
	    //alert("11114pagecreate00000");

		//처리순서 1
		appBasInfo.nowPage = this.id;
		appBasInfo.pageCreate();

	});
	//페이지 초기화=================================================
	$(document).bind("pageinit", function(){
		//alert("11114pageinit111111");

		//console.log("=====page init=====");


	});
    //페이지 보여주기 전=================================================
	$(document).on("pagebeforeshow", "div", function(e,u){
        //alert("11114pagebeforeshow22222");

		appBasInfo.nowPage = this.id;


		console.log("now page======="+this.id);



		appBasInfo.beforShow();



	});
	//=================================================
	$(document).on("pageshow", "div", function(e,u){
        //여기 까지는 아직 페이지아가 보이지 않는다.
		appBasInfo.nowPage = this.id;

		appBasInfo.pageShow();

	});
	//=================================================
	$(document).on("pagehide", "div", function(e,u){
	    //페이지가 전환되면서 이전 페이지가 사라질 때 호출
		appBasInfo.pageHide();


	});
//================================================
//페이지 출력후 아래 순서로 진행
//페이지 관련 기능 -> ready -> load
//================================================
//ready
//================================================
	$(document).ready(function($){
        //여기서 페이지가 출력된다

		//FastClick.attach(document.body);
		
		$( document ).bind( 'mobileinit', function(){
		  	$.mobile.loader.prototype.options.text = "Loading...";
		  	$.mobile.loader.prototype.options.textonly = true;
		  	$.mobile.loader.prototype.options.textVisible = true;
		  	$.mobile.loader.prototype.options.theme = "none";
		  	//$.mobile.loader.prototype.options.html = "<div style='width:100%; text-align:center; z-index:999; background-color:white; border-radius:30px; padding:1px 0;'><img src='./images/loading.png' width='150px'></div>";
	
		  	$.mobile.selectmenu.prototype.options.nativeMenu = false;
		});



       $(".lazy").slick({
         lazyLoad: 'ondemand', // ondemand progressive anticipated
         infinite: false,
       });


        //앱시작시 한번 페이지 기본정보 초기화 한다.
        proPage.pageInit();
        //proPage.slickObj = new Slick();

		
	});
//================================================
//load 처리
//================================================
	$(window).load(function(){

		appBasInfo.wonsiInit();   //기본 화면의 높이를 가져온다.

		leftMenu.insertLeftMnu();


		//페이지 출력 처리를 한다- 처음 메이니 페이지 출력
 		proPage.firstPageGo();



		//console.log("====load====");
		$(document).ajaxStart(function(){
			//lodinggo();
		});
		$(document).ajaxStop(function(){
			$.mobile.loading( "hide" );
		});




        //************************************************************

        $(".musicSangseSe").click(function(){

            $("#musicSangseSe").popup("open");

        });

		$("#idfind").click(function(){

			var el = frmPro.forminput("idfindFrm");
			if(frmPro.formInf){
				var gs1 = new GetServer();
				//서버에서 선택한 사업의 대상자를 가져온다.
				gs1.basServer(gs1, "mu", "mode=idfind&"+el);  //서버에서 post 모드로 가져온다.
			}
			return false;
		});

		$("#passfind").click(function(){

			var el = frmPro.forminput("passfindForm");
			if(frmPro.formInf){
				var gs1 = new GetServer();
				//서버에서 선택한 사업의 대상자를 가져온다.
				gs1.basServer(gs1, "mu", "mode=passfind&"+el);  //서버에서 post 모드로 가져온다.
			}
			return false;
		});

		$("#passChan").click(function(){
			appUtil.moveOkHistory("index.html#PassChange");
		});

		$("#chnagePassGo").click(function(){
			var el = frmPro.forminput("changePass");
			if(frmPro.formInf){
				var gs1 = new GetServer();
				//서버에서 선택한 사업의 대상자를 가져온다.
				gs1.basServer(gs1, "mu", "mode=passchange&email="+meminf.email+"&"+el);  //서버에서 post 모드로 가져온다.
			}
			return false;

		});



		//엔터키 처리를 한다.
		$("#panelCloseImg"+appBasInfo.nowPage).click(function(){
			appUtil.closePannel();

		});

		$("#songShowList").click(function(){
			appBasInfo.songShowSMN = 3;

			appUtil.moveOkHistory("songShow2.html");
		});

		$("#songRecGo").click(function(){

			appUtil.moveOkHistory("songRec.html");
		});



        //****************************************************************
        //아이디 처리
        //****************************************************************
        $(document).on("click","#getTop100, #getNewMr", function(e){
            //alert("kkkkkkkkk22"+this.id);

            $("#addMenuMain").hide();
            $(".musicBarR").show();
            $(".contentLoading").show();
            $("#top100Page").html("");


            switch(this.id){
            case "getTop100":
                toggleCls("getTop100", "roundBtnNormalOn");
                toggleCls("getNewMr", "roundBtnNormalOn");


		getServ = new GetServer();
		getServ.initParam("getMrAll.php", "mode=allMusic5", "top100Page");
		getServ.getPostMode();

            break;
            case "getNewMr":
                toggleCls("getTop100", "roundBtnNormalOn");
                toggleCls("getNewMr", "roundBtnNormalOn");

		getServ = new GetServer();
		getServ.initParam("getMrAll.php", "mode=allMusic5", "top100Page");
		getServ.getPostMode();

            break;
            }


         });
        //****************************************************************
        //클래스 처리
        //****************************************************************
        $(document).on("click",".roundBoxBlue, .footMenuCall", function(e){
            //alert("kkkkkkkkk22"+this.className);

            switch(this.className){
            case "footMenuCall ui-link":

                //alert("ggggg");
                $("#addMenuMain").show();
                $(".musicBarR").hide();

            break;
            case "roundBoxBlue":

                //proPage.loadPage(Jumun);

            break;
            }


         });
        //****************************************************************
        //종료
        //****************************************************************

		
		
	});
//=======================================================================
//기타 처리
//=======================================================================


		//사용자플러그인콜
		/*
		window.netcon = function(str,callback){
			cordova.exec(
				function(message) {//success
				          ////console.log('success plugin callback!');
				          ////console.log('message :' + message);

				          //$("#network3g4g").popup("close");

				}, function(err) {
				    	 //$("#network3g4g").popup("close");
				          ////console.log('error:' + err);
				}, "webViewpage", "SetWifi", []);
		}
		*/



//파일을 복사한다.==================================
function success(Entry) {
    //console.log("New Path: " + Entry.fullPath);
}

function fail(error) {
    //alert("erererer=="+error.code);
}



function moveFile(Entry) {
    //console.log("*******"+Entry+"/ path=="+fileDir);

    var parent = window.resolveLocalFileSystemURI(fileDir, onSuccess, onError);
    parentEntry = new DirectoryEntry({fullPath:parent});

    //파일 엔트리를 이용하여 fileDir 이라는 목적 디렉토리로 "newFile.txt" 라는 이름으로 복사한다.
    Entry.moveTo(parentEntry, "file.copy", success, fail);
}

function onSuccess(Entry) {
    //console.log("New Path: " + Entry.fullPath);
}

function successHandler(){

}

function onError(error) {
    //alert("erererer=="+error.code);
}

function errorHandler(){

}
//==========================================================


//====================================


	function moveGoback(){
		history.go(-1);   //앞으로
	}


    function goPageBack(){
    	//배열에 저장된 페이지로 뒤로 가기 한다
    	var arrsu = proPage.urlHistory.length;

        proPage.urlHistory.pop();
        arrsu = (proPage.urlHistory.length - 1);
        if(arrsu < 0) arrsu = 0;
        var gopg = proPage.urlHistory[arrsu];
        proPage.urlHistory.pop();
        eval("proPage.loadPage("+gopg+")");
    }

	//뒤로가기
	function moveBack(){

		if(appBasInfo.nowPage == "Fpage2"){

			//alert("moveBack==="+proPage.urlHistory.length);
			if(proPage.urlHistory.length == 1) navigator.notification.confirm(lngTxt.endOk, proMsg.onBackKeyDownMsg, lngTxt.endbtn, lngTxt.nookbtn);
			else{

			    if(proPage.pageId == "gasathinkPro"){
			        if(!localSys.thinkFileWrInf){
			            navigator.notification.confirm('파일을 저장하지 않으면 삭제 됩니다.', function(button){
                    	    	if(button == 1){   //그냥 함수를 빠져나간다.
                    	    		//alert("iiiiiiiii");
                    	    		goPageBack();
                    	    	}
                    		}, '알림', '삭제,저장');   //1:삭제,  2:저장
			        }else{
			                    goPageBack();
			        }
			    }else{
			                    goPageBack();
			    }

			}

		}else if(appBasInfo.nowPage == "AASangse" || appBasInfo.nowPage == "AASangseNew"){
			if(gobackPg != ""){
				moveOkHistory(gobackPg);
				gobackPg = "";
			}
		}else{
			history.go(-1);   //앞으로
		}

	}



	function exitApp(){
		//app exit
		navigator.app.exitApp();
	}




	function lodinggo(){
	    $.mobile.loading( "show", {
	        text: "Loading...",
	        textVisible: true,
	        theme: "none",
	        textonly: false,
	        html: "<div style='width:80%; margin:0 10%; text-align:center; border-radius:15px; padding:1px 0;'><img src='./images/loading2.gif' width='50px'></div>"
	    });

		//console.log("====lodinggo()++++");
	}






	function datepick(obj){
		obj.datepicker({
			         inline: true,
			              dateFormat: "yy-mm-dd",    /* 날짜 포맷 */
			              prevText: 'prev',
			              nextText: 'next',
			              showButtonPanel: true,    /* 버튼 패널 사용 */
			              changeMonth: true,        /* 월 선택박스 사용 */
			              changeYear: true,        /* 년 선택박스 사용 */
			             showOtherMonths: true,    /* 이전/다음 달 일수 보이기 */
			             selectOtherMonths: true,    /* 이전/다음 달 일 선택하기 */
			             showOn: "button",
			             buttonImage: "img/calendar03.gif",
			             buttonImageOnly: true,
			             minDate: '-30y',
			             closeText: '닫기',
			             currentText: '오늘',
			             showMonthAfterYear: true,        /* 년과 달의 위치 바꾸기 */
			             /* 한글화 */
			             monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			             monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			             dayNames : ['일', '월', '화', '수', '목', '금', '토'],
			             dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
			             dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
			             showAnim: 'slideDown',
			             /* 날짜 유효성 체크 */
			             onClose: function( selectedDate ) {
			                 obj.datepicker("option","minDate", selectedDate);
			             }
			         });


	}


	//back button 클릭
	function onBackKeyDown() {
		//alert("bb");

		if(pushBack){   //푸쉬에서 넘어온 경우
			pushBack = false;
			goHome();
		}else{
			moveBack();
		}

	}

