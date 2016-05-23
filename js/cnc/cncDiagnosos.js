SyntecRemoteWeb.controller('cncDiagnosis',['$scope','$http', '$interval','$timeout', function SyntecRemote($scope,$http,$interval,$timeout){

	$scope.cncProfiles['Diagnosis']['Interval'] = $interval(function(){
		
		if( $scope.diagnosisCmd['isGettingData'] == true ){
			return;
		}

		//get data from db
		GetDiagnosisData();
	},1000);

	$scope.curtDiagUnit = "R_Bit";
	$scope.diagUnits = {
		R_Bit		: { "name":"R 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
		I_Bit		: { "name":"I 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
		O_Bit		: { "name":"O 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
		C_Bit		: { "name":"C 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
		S_Bit		: { "name":"S 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
		A_Bit		: { "name":"A 值", "bgColor":"#ffffff", "fontColor":"#FF6800", "maxNo":65535 },
	};

	//$scope.editedValue = 0;
	$scope.diagnosisData = [
		{"no":11,"value":5},
		{"no":18,"value":7},
	];
	$scope.diagnosisCmd = {};

	$scope.setDiagParam = function( unitKey )
	{
		chosedColor = { "bg":"#FF6800", "font":"#ffffff" };
		tabClick( $scope.diagUnits, unitKey, chosedColor);
		$scope.curtDiagUnit = unitKey;

		var szCmd = GetCommandFromCmdList( unitKey );
		CreateCommand(szCmd, 0, 99);
	}
 	CreateCommand = function( szCommand, nStart, nEnd )
 	{
 		$scope.diagnosisCmd['uniID'] = "";
 		$scope.diagnosisCmd['Command'] = szCommand;
 		$scope.diagnosisCmd['Start'] = nStart;
 		$scope.diagnosisCmd['End'] = nEnd;
 		$scope.diagnosisCmd['isGettingData'] = true;
 		$scope.diagnosisCmd['UpdateTime'] = "";
		//$scope.diagnosisData = [];
		DoCommand();
 	}
 	//show
	$scope.ShowTitle = function( nColumnIndex, nRowIndex )
	{
		if( nColumnIndex == -1 ){
			return ( (nRowIndex) < 0 ) ? "-" : (nRowIndex);
		}

		if( nRowIndex == -1 ){
			return ( (nColumnIndex) < 0 ) ? "-" : (nColumnIndex);
		}
	}
	$scope.TitleStyle = function( nColumnIndex, nRowIndex )
	{
		if( nRowIndex == -1 ){
			return {'background':"#FF6800", "width":"100%", "color":"#000"};
		}

		if( nColumnIndex == -1 ){
			return {'background':"#FF6800", "width":"100%", "color":"#000"};
		}
	}
	$scope.ShowDiagTens = function()
	{
		var aryTens = [ "-1" ]; // default
		var ten = Math.floor($scope.diagnosisCmd['End']/100);
		ten = ten*100;
		for( var i=0; i<10; i++ ){
			var index = ten + (i*10);
			if( index > $scope.diagUnits[$scope.curtDiagUnit]['maxNo'] ){
				break;
			}
			aryTens.push(index);
		}

		return aryTens;
	}
	//data
	$scope.MappingDataIntoTable = function( nTens, nDigits )
	{
		if( $scope.diagnosisData.length == 0 ){
			return;
		}

		if( nTens == -1 || nDigits == -1 ){
			return;
		}

		var nNo = nTens + nDigits;
		for( var i=0; i<$scope.diagnosisData.length; i++ ){
			if( $scope.diagnosisData[i].no == nNo ){
				return $scope.diagnosisData[i].value;
			}
		}
	}
	//edit data
		$scope.DbClickToEditValue = function( nTens, nDigits )
		{
			$scope.edit = true;
			$scope.cloneData = $scope.diagnosisData;
			console.log($scope.editedValue);
		}
		$scope.EditDiagData = function( nTens, nDigits )
		{
			if( typeof $scope.editedValue == "undefined" ){
				return;
			}

			console.log( $scope.editedValue );

			var nNo = nTens + nDigits;
			for( var i=0; i<$scope.diagnosisData.length; i++ ){
				if( $scope.diagnosisData[i].no == nNo ){
					$scope.diagnosisData[i].value = $scope.editedValue;
				}
			}
		}
	//specific
	$scope.FindSpecificNo = function()
	{
		if( $scope.nDiagNo == "" ){
			return;
		}

		if( $scope.nDiagNo == null ){
			return;
		}

		try {
			//show red color
			var nTens = Math.floor(parseInt($scope.nDiagNo)/10);
			nTens = nTens *10;
			var nDigits = $scope.nDiagNo - nTens;

			$scope.SpecificNoStyle(nTens,nDigits);

			var number = Math.floor(parseInt($scope.nDiagNo)/100);
			
			var command = $scope.diagnosisCmd['Command'];
			var newStart = (number*100);
			var newEnd = (number*100) + 99;

			if( newStart == $scope.diagnosisCmd['Start'] ){
				return;
			}
			
			CreateCommand(command, newStart, newEnd);
		}
		catch(err) {
			return;
		}
	}
	$scope.SpecificNoStyle = function( nTens, nDigits )
	{
		if( $scope.diagnosisData.length == 0 ){
			return;
		}

		if( nTens == -1 || nDigits == -1 ){
			return;
		}

		var nNo = nTens + nDigits;
		if( $scope.nDiagNo == nNo ){
			//console.log($scope.nDiagNo);
			return {'background':'#FF4A51'};
		}
	}
	//btn click page
	$scope.PrePage = function()
	{
		var command = $scope.diagnosisCmd['Command'];
		var newStart = $scope.diagnosisCmd['Start'] - 100;
		var newEnd = $scope.diagnosisCmd['End'] - 100;
		CreateCommand(command, newStart, newEnd);
	}
	$scope.NextPage = function()
	{
		var command = $scope.diagnosisCmd['Command'];
		var newStart = $scope.diagnosisCmd['Start'] + 100;
		var newEnd = $scope.diagnosisCmd['End'] + 100;
		CreateCommand(command, newStart, newEnd);
	}
	



	DoCommand = function()
	{		
		if( $scope.diagnosisCmd['End'] > $scope.diagUnits[$scope.curtDiagUnit]['maxNo'] ){
			$scope.diagnosisCmd['End'] = $scope.diagUnits[$scope.curtDiagUnit]['maxNo'];
		}

		var param = [];
		param.push($scope.diagnosisCmd['Start']);
		param.push($scope.diagnosisCmd['End']);

		var commandObj = {"method":"DiagnosisCommand", "cncID":$scope.cncID, "command":$scope.diagnosisCmd['Command'], "param":param };
        //console.log(commandObj);
		$http({
			method:'POST',
			url:'server/CommandAjax.php',
			data: $.param(commandObj),
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
		}).
		success(function(json){
			console.log( json );
			if( json.result == "error" ){
				//console.log( json );
			}


			//get new uniID
			$scope.diagnosisCmd['uniID'] = json.data.uniID;
			$scope.diagnosisCmd['isGettingData'] = false;

		}).
		error(function(json){
			console.warn(json);
		});
	}
	GetDiagnosisData = function()
	{
		//no uni id, cannot get data
		if( $scope.diagnosisCmd['uniID'] == "" ){
			return;
		}

		$scope.diagnosisCmd['isGettingData'] = true;

		var commandObj = {"method":"UpdatingDiagnosisData", "cncID":$scope.cncID, "commandParam":$scope.diagnosisCmd };
        //console.log(commandObj);
		$http({
			method:'POST',
			url:'server/CommandAjax.php',
			data: $.param(commandObj),
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
		}).
		success(function(json){
			console.log( json );
			if( json.result == "error" ){
				//console.log( json );
			}
			MappingDataFromDBIntoAry(json.data);
		}).
		error(function(json){
			console.warn(json);
		});
	}
	MappingDataFromDBIntoAry = function( diagnosisData )
	{
		if( diagnosisData.length == 0 ){
			$scope.diagnosisCmd['isGettingData'] = false;
			return;
		}

		$scope.diagnosisData = [];

		var lastUpdatingTime = new Date(diagnosisData[0]['agent_time']);

		for(var i=0; i<diagnosisData.length; i++ ){
			
			var update_time = new Date(diagnosisData[i]['agent_time']);
			if( update_time - lastUpdatingTime > 0 ){
				lastUpdatingTime = update_time;
			}

			var diagObj = {"no":diagnosisData[i]['no'], "value":diagnosisData[i]['value']};
			$scope.diagnosisData.push(diagObj);
		}

		$scope.diagnosisCmd['UpdateTime'] = changeDateToTime(lastUpdatingTime);
		$scope.diagnosisCmd['isGettingData'] = false;
	}


}]);