<?php
include_once "../include/controlSetting.php";
include_once APP_PATH.'/include/database/DBDataAPI.php';


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
		$nCNCID = $post['cncID'];
		$nErrorCode = GetDBData('GetCommandResult', $nCNCID, $param, $aryCmdResult );

		$result = array(
			"result"=> "success", 
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
	case "UploadFile":
		$timeObj = new DateTime();
		$currenttime = $timeObj->format('Y-m-d H:i:s');

		//upload file
		$fileConecnt = file_get_contents($_FILES['file']['tmp_name']);
		$param = array(
			"name"			=> $_FILES['file']['name'],
			"file"			=> addslashes($fileConecnt),
			"size"			=> $_FILES['file']['size'],
			"upload_time"	=> $currenttime,
		);

		$nCNCID = $post['cncID'];
		$result = array();
		$nErrorCode = GetDBData('UploadNcFile', $nCNCID, $param, $result );

		//remove unless param, and sent param back
		unset($param['file']);

		$result = array(
			"result"	=> "success",
			"data"		=> $param,
		);

		print_r( json_encode($result) );
	break;
	case "DownloadFile":
		$timeObj = new DateTime();
		$currenttime = $timeObj->format('Y-m-d H:i:s');

		$param = array(
			"fileName"	=>	$post['fileName'],
		);

		$nCNCID = $post['cncID'];
		$fileAry = array();
		$nErrorCode = GetDBData('DownloadNcFile', $nCNCID, $param, $fileAry );


		$result = array(
			"result"=> "success",
			"data" => $fileAry,
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
}

function GetDiagnosisIndex( $command )
{
	switch( $command ){
		case "Read_I":
			return 0;
		break;
		case "Read_O":
			return 1;
		break;
		case "Read_C":
			return 2;
		break;
		case "Read_S":
			return 3;
		break;
		case "Read_A":
			return 4;
		break;
		case "Read_R":
			return 5;
		break;
		// add new type here
		default:
			return -1;
		break;
	}
	/*Global_Var,
	System_Var,
	Param,
	Registry_Var,*/
	
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