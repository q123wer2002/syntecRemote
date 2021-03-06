<?php
include_once "../database/initSetting.php";

if( isset($_POST) && isset($_POST['method']) ){
	$post = $_POST;
}else{
	echo "not defined";
	exit;
}


$method = $post['method'];

switch($method){
	case "Command":

		$uniID = GetUniID();
		$timeObj = new DateTime();
		$currenttime = $timeObj->format('Y-m-d H:i:s');

		$param = array(
			"uniID"		=>	$uniID,
			"command"	=>	$post['command'],
			"cmdParam"	=>	$post['param'],
			"webTime"	=>	$currenttime,
		);

		$nCNCID = $post['cncID'];
		$result = array();
		$nErrorCode = GetDBData('Command', $nCNCID, $param, $result );


		$result = array(
			"result"=> "success", 
			"data"	=> $param,
		);

		print_r( json_encode($result) );
	break;
	case "GetCommandResult":
		$param = array(
			"uniID"		=> $post['uniID'],
		);

		$aryCmdResult = array();
		$nCNCID = ( isset($post['cncID']) == true ) ? $post['cncID'] : 0;
		$nErrorCode = GetDBData('GetCommandResult', $nCNCID, $param, $aryCmdResult );

		$result = array(
			"result"=> $nErrorCode,
			"data"	=> $aryCmdResult,
		);

		print_r( json_encode($result) );
	break;
	case "GetDiagnosisData":

		$diagType = GetDiagnosisIndex( $post['commandParam']['Command'] );
		$param = array(
			"uniID"		=> $post['commandParam']['uniID'],
			"type"		=> $diagType,
			"start"		=> $post['commandParam']['Start'],
			"end"		=> $post['commandParam']['End'],
		);

		$aryDiagData = array();
		$nCNCID = $post['cncID'];
		$nErrorCode = GetDBData('GetCNCVar', $nCNCID, $param, $aryDiagData );

		$result = array(
			"result"=> "success", 
			"data"	=> $aryDiagData,
			"uniID"	=> $param['uniID'],
		);

		print_r( json_encode($result) );
	break;
	case "GetNcFileList":

		$nCNCID = $post['cncID'];
		$result = array();
		$nErrorCode = GetDBData('GetCNCNcFileList', $nCNCID, array(), $result );

		$result = array(
			"result"=> "success", 
			"data"	=> $result,
		);

		print_r( json_encode($result) );
	break;
	case "GetOffsetData":

		$aryOffsetData = array();
		$nCNCID = $post['cncID'];
		$nErrorCode = GetDBData('GetOffsetData', $nCNCID, array(), $aryOffsetData );

		$result = array(
			"result"=> "success", 
			"data"	=> $aryOffsetData,
		);

		print_r( json_encode($result) );
	break;
	case "WriteOffsetData":
		$timeObj = new DateTime();
		$currenttime = $timeObj->format('Y-m-d H:i:s');

		$param = array(
			"no"			=> $post['no'],
			"value"			=> $post['value'],
			"update_time"	=> $currenttime,
		);

		$writeResult = array();
		$nCNCID = $post['cncID'];
		$nErrorCode = GetDBData('WriteOffsetData', $nCNCID, $param, $writeResult );

		$result = array(
			"result"=> "success", 
			"data"	=> $param,
		);

		print_r( json_encode($result) );
	break;
	case "GetDebugLog":

		$timeObj = new DateTime();
		$currenttime = $timeObj->format('Ymd');
		
		$param = array(
			"szTime"		=> $currenttime,
		);

		$degubLog = array();
		$nCNCID = $post['cncID'];
		$nErrorCode = GetDBData('GetDebugLog', $nCNCID, $param, $degubLog );

		$result = array(
			"result"=> "success", 
			"data"	=> $degubLog,
		);

		print_r( json_encode($result) );
	break;
}

//preloadPage.php delete all command
function GetUniID()
{
	DeleteOldUniID();

	$uniID = CreateUniID();
	$_SESSION['companyInfo']['oldWid'] = array();
	array_push($_SESSION['companyInfo']['oldWid'], $uniID);

	return $uniID;
}
function CreateUniID()
{
	$uniID = uniqid();
	return $uniID;
}
function DeleteOldUniID()
{
	$result = array();
	GetDBData('DeleteAllOldCmdByWid', 0, array(), $result );
}

?>