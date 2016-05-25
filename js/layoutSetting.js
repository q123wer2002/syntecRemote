
SyntecRemoteWeb.controller('SyntecLayoutSet',['$scope','$http', '$interval',function SyntecRemote($scope,$http,$interval){
	
	$scope.curtTag = "";
	$scope.tagObjectAry = {
		myLayout		: { 'tagName':"我的樣式", "color":"#FFEC94", "isShow":false, "top":"100px" },
		newLayout		: { 'tagName':"新增樣式", "color":"#00A2E8", "isShow":false, "top":"50px" },
		viewFunList		: { 'tagName':"功能列表", "color":"#22B14C", "isShow":false, "top":"150px" },
	};
	$scope.InitTagName = function()
	{
		$scope.tagObjectAry["myLayout"].tagName = "我的樣式";
		$scope.tagObjectAry["myLayout"].isShow = false;
		$scope.tagObjectAry["viewFunList"].tagName = "功能列表";
		$scope.tagObjectAry["viewFunList"].isShow = false;
	}
	$scope.ShowLayoutItem = function( szTagKey, szTagValue, isSelectCom )
	{
		if( (isSelectCom == false) && (szTagValue.tagName == "收起" || szTagKey == "newLayout") ){
			jQuery('.layoutListLeftDiv').css('left','-210px');
			$scope.InitTagName();
			if( szTagKey == "newLayout" ){
				$scope.NewLayout( $scope.viewDevice );
			}
		}else{
			$scope.curtTag = szTagKey;
			$scope.InitTagName();

			szTagValue.tagName = "收起";
			szTagValue.isShow = true;

			jQuery('.layoutListLeftDiv').css('left','0px');
		}
	}
	$scope.NewLayout = function( szDevice )
	{
		var newLayout = {
			name : "",
			web : {
				listView : { "com1":[], "com2":[], "com3":[], "com4":[], "com5":[], "com6":[], "com7":[], "com8":[], "com9":[], "com10":[],},
				bigView : {
					top : {},
					mid : {},
					bot : {},
					out : {},
				},
			},
		};

		$scope.curtLayout = newLayout;
	}
	$scope.ViewMyLayout = function( szDevice, layout )
	{
		$scope.curtLayout = layout;
		$scope.ShowLayoutItem('myLayout', $scope.tagObjectAry['myLayout'], false);
	}

	$scope.isBigView = false;
	$scope.ShowViewHint = function( isBigView )
	{
		if( isBigView == true ){
			return "大圖式";
		}

		return "列表";
	}
	$scope.ShowSelectedComValue = function( szDevice, isBigView )
	{
		if( szDevice == "web" ){
			var viewType = ( isBigView == true ) ? "bigView" : "listView";
			if( isBigView == false ){
				return $scope.curtLayout[szDevice][viewType][$scope.selectedPosition];
			}else{
				var showObj = $scope.selectedPosition.split(",");
				return $scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]];
			}
		}
	}
	$scope.ViewFunList = function( szDevice, szListView )
	{
		if( szDevice == "web" ){
			//web
			if( szListView == "bigView" ){
				$scope.isBigView = true;
			}

			if( szListView == "listView" ){
				$scope.isBigView = false;
			}

		}else{
			//mobile
		}
	}
	$scope.SetComponentToSelected = function( szDevice, isBigView, componentObj )
	{
		if( $scope.selectedPosition.length == 0 ){
			return;
		}

		if( szDevice == "web" ){
			var viewType = ( isBigView == true ) ? "bigView" : "listView";
			if( isBigView == false ){
				$scope.curtLayout[szDevice][viewType][$scope.selectedPosition] = [];
				$scope.curtLayout[szDevice][viewType][$scope.selectedPosition].push(componentObj.name)
				$scope.curtLayout[szDevice][viewType][$scope.selectedPosition].push(componentObj.DBschema);
				$scope.curtLayout[szDevice][viewType][$scope.selectedPosition].push(componentObj.prefixName);
			}else{
				var showObj = $scope.selectedPosition.split(",");
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]] = [];
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]].push(componentObj.name);
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]].push(componentObj.bigViewSize);
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]].push(componentObj.DBschema);
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]].push(componentObj.prefixName);
				
				ResizeViewSpace( $scope.curtLayout[szDevice][viewType][showObj[0]] );
			}
		}
	}
	$scope.RemoveComponent = function( szDevice, isBigView )
	{
		if( szDevice == "web" ){
			var viewType = ( isBigView == true ) ? "bigView" : "listView";
			if( isBigView == false ){
				$scope.curtLayout[szDevice][viewType][$scope.selectedPosition] = [];
			}else{
				var showObj = $scope.selectedPosition.split(",");
				$scope.curtLayout[szDevice][viewType][showObj[0]][showObj[1]] = [];
				
				ResizeViewSpace( $scope.curtLayout[szDevice][viewType][showObj[0]] );
			}
		}
	}


//view funciton
	$scope.myLayoutList = [];
	$scope.curtLayout = {
		name : "",
		web : {
			listView : { "com1":[], "com2":[], "com3":[], "com4":[], "com5":[], "com6":[], "com7":[], "com8":[], "com9":[], "com10":[],},
			bigView : {
				top : {},
				mid : {},
				bot : {},
				out : {},
			},
		},
	};
	$scope.canUseComponentList = [];

	$scope.isEmptyCom = function( viewType, comObj )
	{
		if( viewType == "listView" && typeof comObj[0] == "undefined" ){
			return "#AAFFC3";
		}
			
		var nCountObj = Object.keys(comObj).length;

		if( nCountObj == 0 ){
			comObj['com1'] = [];
			comObj['com2'] = [];
			comObj['com3'] = [];
			comObj['com4'] = [];
			return;
		}

		if( nCountObj == 4 ){
			return;
		}

		ResizeViewSpace( comObj );
	}
	ResizeViewSpace = function( componentObj )
	{
		var nSpace = 0;
		var nComponentNum = 0;
		var componentNameAry = ['com1', 'com2', 'com3', 'com4'];
		//Debug(componentObj);
		for( var i=0; i<componentNameAry.length; i++ ){
			nSpace += CountViewSpace( componentObj[componentNameAry[i]] );
			nComponentNum = i;
			if( nSpace == 4 ){
				break;
			}
		}

		//not occupy 4 space, no 4 components
		while( nSpace < 4 ){
			nComponentNum ++;
			componentObj[componentNameAry[nComponentNum]] = [];
			nSpace ++;
		}
		
		//not 4 components, but occupy 4 space
		if( nSpace == 4 && nComponentNum != 3 ){
			while( nComponentNum < 3 ){
				nComponentNum ++;
				if( typeof componentObj[componentNameAry[nComponentNum]] == "undefined" ){
					break;
				}

				if( componentObj[componentNameAry[nComponentNum]].length == 0 ){
					delete componentObj[componentNameAry[nComponentNum]];
				}
			}
		}
	}
	CountViewSpace = function( objValue )
	{
		if( typeof objValue == "undefined" ){
			return 0;
		}

		if( objValue.length == 0 ){
			return 1;
		}
		
		var nWH = objValue[1].split("*");
		var nOccuSpace = parseInt(nWH[0])*parseInt(nWH[1]);
		return nOccuSpace;
	}

	$scope.objCubeStyle = function( viewObj )
	{
		switch( viewObj[1] ){
			case "1*1":
				return {'width':'45%', 'height':'40px'};
			break;
			case "1*2":
				return {'width':'45%', 'height':'90px'};
			break;
			case "2*1":
				return {'width':'92%', 'height':'40px'};
			break;
			case "2*2":
				return {'width':'92%', 'height':'90px'};
			break;
		}
	}

	$scope.selectedPosition = "";
	$scope.SetViewComponent = function( szDevice, szViewType, item )
	{
		//Debug(item);
		if( szDevice == "web" ){
			if( szViewType == "listView" ){
				$scope.selectedPosition = item;
				$scope.isBigView = false;
				$scope.ShowLayoutItem('viewFunList', $scope.tagObjectAry['viewFunList'], true);
			}else{
				//var bigViewObj = item.split(",");
				$scope.selectedPosition = item;
				$scope.isBigView = true;
				$scope.ShowLayoutItem('viewFunList', $scope.tagObjectAry['viewFunList'], true);
			}
		}
	}

//connect db function
	$scope.InitLayoutSetting = function( szDevice )
	{
		$scope.InitMyLayout(szDevice);
		$scope.InitCanUseComList(szDevice);
	}
	$scope.InitMyLayout = function( szDevice )
	{
		//create object to request
		var initUseListObj = {"method":"initMyLayout", "device":szDevice };
		$http({
			method:'POST',
			url:'server/layoutSettingAjax.php',
			data: $.param(initUseListObj),
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
		}).
		success(function(json){
			//Debug(json);
			if( json.result == "success" ){
				CreateMyLayoutList( szDevice, json.data);
			}
		}).
		error(function(json){
			console.warn(json);
		});
	}
	CreateMyLayoutList = function( szDevice, aryMyLayout )
	{
		if( szDevice == 'web' ){
			for( var key in aryMyLayout ){
				$scope.myLayoutList.push( b64DataToLayoutJSON(szDevice, aryMyLayout[key].file) );
			}
		}
	}
	$scope.InitCanUseComList = function( szDevice )
	{
		//create object to request
		var initUseListObj = {"method":"initUseComponentList", "device":szDevice };
		$http({
			method:'POST',
			url:'server/layoutSettingAjax.php',
			data: $.param(initUseListObj),
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
		}).
		success(function(json){
			//Debug(json);
			if( json.result == "success" ){
				CreateCanUseList(json.data, szDevice);
			}
		}).
		error(function(json){
			console.warn(json);
		});
	}
	CreateCanUseList = function( aryUseDataList, szDevice )
	{
		//Debug(aryUseDataList);
		for(var i=0; i<aryUseDataList.length; i++ ){
			var canUseObj = {"name":aryUseDataList[i].funDetail[0], "bigViewSize":aryUseDataList[i].funDetail[1][szDevice], "DBschema":aryUseDataList[i].funDetail[5], "prefixName":aryUseDataList[i].funName};
			$scope.canUseComponentList.push(canUseObj);
		}
	}

	//save layout
	$scope.SaveLayout = function( szDevice )
	{
		if( $scope.curtLayout['name'] == "" ){
			$scope.errorMsg = "名稱未輸入";
			return;
		}
		//save
		$scope.errorMsg = "儲存資料中..";

		//creating file...
		var szB64Layout = b64WriteContentToFile( szDevice, $scope.curtLayout );
		//Debug(szB64Layout);
		//start insert database
		var initUseListObj = {"method":"saveLayout", "layoutDevice":szDevice, 'layoutName': $scope.curtLayout['name'], 'b64Layout':szB64Layout };
		$http({
			method:'POST',
			url:'server/layoutSettingAjax.php',
			data: $.param(initUseListObj),
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
		}).
		success(function(json){
			//Debug(json);
			if( json.result == "success"){
				$scope.errorMsg = "儲存完畢";
				$scope.InitMyLayout( szDevice );
			}
		}).
		error(function(json){
			console.warn(json);
		});
	}

}]);