<?php
include_once "../include/controlSetting.php";

if( isset($_POST) && isset($_POST['method']) ){
	$post = $_POST;
}else{
	echo "not defined";
	exit;
}

$method = $post['method'];

switch($method){
	case "initUseComponentList":			
		//include database api, function module
		include_once APP_PATH.'/include/database/DBDataAPI.php';
		include_once APP_PATH.'/include/module/funModuleClass.php';
		//end include

		$aryCNCList = array();
		$nFactoryID = $_SESSION['RemoteViewer']['companyInfo']['fid'][0];
		$nErrorCode = GetDBData('CncListFromF', $nFactoryID, array(), $aryCNCList );
		
		//means success
		if( $nErrorCode === 0 ){
			$nCNCID = $aryCNCList[0]['cnc_id']; //default

			//get function list
			$functionObj = new FunctionObj( $nCNCID );

			$initCanUseList = $functionObj->aryCheckFunctionList();
			//print_r($_SESSION['RemoteViewer']['canUseFunctionList']);

			unset( $nCNCID );
			unset( $functionObj );
		}

		unset( $aryCNCList );
		unset( $nFactoryID );
		unset( $nErrorCode );

		$result = array(
			"result"=> "success", 
			"data"	=> $initCanUseList
		);

		print_r( json_encode($result) );
	break;

	case "initMyLayout":
		//include database api, function module
		include_once APP_PATH.'/include/database/DBDataAPI.php';
		//end include

		$initMyLyout = array();
		$nCID = $_SESSION['RemoteViewer']['companyInfo']['company_id'];
		$nErrorCode = GetDBData('GetMyLayout', $nCID, array(), $initMyLyout );
		ErrorLog( $nErrorCode );

		$result = array(
			"result"=> "success", 
			"data" => $initMyLyout,
		);

		print_r( json_encode($result) );
	break;

	case "saveLayout":
		//include database api, function module
		include_once APP_PATH.'/include/database/DBDataAPI.php';
		//end include
		$tmpAry = array();
		$nCID = $_SESSION['RemoteViewer']['companyInfo']['company_id'];
		$param = array( "device"=>$post['layoutDevice'], "layoutName"=>$post['layoutName'], "layoutFile"=>$post['b64Layout'] );
		$nErrorCode = GetDBData('saveLayout', $nCID, $param, $tmpAry );
		ErrorLog( $nErrorCode );

		$result = array(
			"result"=> "success", 
		);

		print_r( json_encode($result) );
	break;
}


?>