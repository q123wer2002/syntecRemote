<?php

//import setting
include_once "preLoadPage.php";

//get cnc ID
$cnc = (isset($_GET['cnc']) == true) ? $_GET['cnc'] : "none";

//get group id
$sqlTmp = "SELECT cnc.cnc_group_id as gID FROM cnc WHERE cnc.cnc_id=".$cnc;
$RemoteModule->SQLQuery( 'getGroupID',$sqlTmp);
$groupID = $RemoteModule->resultArray['getGroupID'][0]['gID'];
unset($sqlTmp);
unset($RemoteModule->resultArray['getGroupID']);

if( $cnc == "none" || 
	empty($groupID) || 
	isset($_SESSION['RemoteViewer']['companyInfo']['gid']) == false || 
	in_array( $groupID, $_SESSION['RemoteViewer']['companyInfo']['gid']) == false 
	){
	redirect(WEB_URL);
}

$RemoteView->cncID = $cnc;
$RemoteView->gID = $groupID;



//get web structure from database
$RemoteView->allShowList = array(
	"web" => array( "fID","fName", "gName", "gIPCAM", "cncID", "cncName", "cncStatus", "cncPic", "cncInfo", "cncHisOOE", "cncHisAlarm", "cncHisRecord", "cncDiagnosis", "cncFileTransfer", "cncUpdateTime" ),
	"mobile" => array( "fName", "gName", "gIPCAM", "cncID", "cncName", "cncStatus", "cncPic", "cncInfo","cncHisOOE", "cncHisAlarm", "cncHisRecord", "cncUpdateTime" ),
);
if( $RemoteView->viewDevice == "web" ){
	$RemoteView->userDefinedShowList = json_encode( $RemoteView->allShowList['web'] );
}elseif( $RemoteView->viewDevice == "mobile" ){
	$RemoteView->userDefinedShowList = json_encode( $RemoteView->allShowList['mobile'] );
}



//==================================
//show page depend on user mode
if( $RemoteModule->userMode == "Management" || $RemoteModule->userMode == "Operation"){
	//choose the correct page
	$RemoteView->contentHtml = APP_PATH."/templates/".$RemoteView->viewDevice."/content/cnc.html";
}



$RemoteView->setLayout();
unset($RemoteView);
unset($RemoteModule);

?>