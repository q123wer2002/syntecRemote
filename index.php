<?php

//import setting
include_once "preLoadPage.php";

//get web structure from database
$RemoteView->allShowList = array(
	//array( "fID", "fName", "fTotalCNC", "fOOE", "fStatusOfCnc", "gID", "gName", "gTotalCNC", "gOOE", "gIPCAM", "gStatusOfCnc"),
	"web" => array( "fID", "fName", "fTotalCNC", "fOOE", "fStatusOfCnc", "gID", "gName", "gTotalCNC", "gOOE", "gStatusOfCnc"),
	"mobile" => array( "fID", "fName", "fTotalCNC", "fOOE", "fStatusOfCnc", "gID", "gName", "gTotalCNC", "gOOE", "gStatusOfCnc" ),
);

if( $RemoteView->viewDevice == "web" ){
	//web viewer
	$RemoteView->userDefinedShowList = json_encode( $RemoteView->allShowList['web'] );
	$RemoteView->contentHtml = APP_PATH."/templates/".$RemoteView->viewDevice."/content/dashboard.html";

}elseif( $RemoteView->viewDevice == "mobile" ){
	//mobile viewer
	$RemoteView->userDefinedShowList = json_encode( $RemoteView->allShowList['mobile'] );
	
	//show page depend on user mode
	$RemoteView->userMode = $RemoteModule->userMode;
	if( $RemoteModule->userMode == "Management"){
		//choose the correct page
		$RemoteView->contentHtml = APP_PATH."/templates/".$RemoteView->viewDevice."/content/factoryOverview.html";
	}elseif( $RemoteModule->userMode == "Operation"){
		//choose the correct page
		$RemoteView->contentHtml = APP_PATH."/templates/".$RemoteView->viewDevice."/content/factoryList.html";
	}
}

$RemoteView->setLayout();
unset($RemoteView);
unset($RemoteModule);


?>