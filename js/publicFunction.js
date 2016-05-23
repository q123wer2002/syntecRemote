findUpdatingList = function( userShowAry, updatingAry, storeAllUpdatingListAry, storeSubUpdatingListAry )
{
	if( typeof storeSubUpdatingListAry == "undefined" ){
		for( var i=0; i<updatingAry.length; i++ ){
			if( userShowAry.indexOf( updatingAry[i] ) != -1 ){
				storeAllUpdatingListAry.push( updatingAry[i] );
			}
		}
	}else{
		for( var i=0; i<updatingAry.length; i++ ){
			if( userShowAry.indexOf( updatingAry[i] ) != -1 ){
				storeAllUpdatingListAry.push( updatingAry[i] );
				storeSubUpdatingListAry.push( updatingAry[i] );
			}
		}
	}
}

//scroll to buttom
scrollToButtom = function()
{
	window.scrollTo(0,document.body.scrollHeight); 
}

//change time
changeDateToTime = function( dateString )
{
	//console.log(dateString);
	var pureDate = new Date( dateString );
	var nowDate = new Date();

	//minute, hour, days, month, year

	var timeDiffer = (nowDate-pureDate)/1000; //second
	if( timeDiffer < 60 ){
		return Math.round(timeDiffer) + "秒前";
	}

	timeDiffer = timeDiffer/60; //minute
	if( timeDiffer < 60 ){
		return Math.round(timeDiffer) + "分鐘前";
	}

	timeDiffer = timeDiffer/60; //hour
	if( timeDiffer < 24 ){
		return Math.round(timeDiffer) + "小時前";
	}

	timeDiffer = timeDiffer/24 //day
	if( timeDiffer < 30 ){
		return Math.round(timeDiffer) + "天前";
	}
	
	timeDiffer = timeDiffer/30 //month
	return "約" + Math.round(timeDiffer) + "個月前";

	//var monthOfDays = [31,28,31,30,31,30,31,31,30,31,30,31];

	//console.log( (nowDate-pureDate)/86400000/30 ); //ms
}
computeSecondsOfTimeunit = function ( recordDate, timeUnit )
{
	var secondOfTimeunit = 0;

	if( timeUnit == "DAY" ){
		//setDate()
		secondOfTimeunit = 24*60*60; //a day of seconds
	}else if( timeUnit == "MONTH" ){
		//setMonth()
		var recordStdDate = new Date( recordDate );
		if( (recordStdDate.getMonth()+1) == 2 ){
			//Feb
			if( recordStdDate.getFullYear()%4 == 0 ){
				secondOfTimeunit = 29*24*60*60; //29 days
			}else{
				secondOfTimeunit = 28*24*60*60; //28 days
			}
		}else if( (recordStdDate.getMonth()+1) <= 7 ){
			if( (recordStdDate.getMonth()+1)%2 == 0 ){
				secondOfTimeunit = 30*24*60*60; //30 days
			}else{
				secondOfTimeunit = 31*24*60*60; //31 days
			}
		}else if( (recordStdDate.getMonth()+1) > 7 ){
			if( (recordStdDate.getMonth()+1)%2 == 0 ){
				secondOfTimeunit = 31*24*60*60; //31 days
			}else{
				secondOfTimeunit = 30*24*60*60; //30 days
			}
		}
	}else if( timeUnit == "YEAR" ){
		//setYear();
		var recordStdDate = new Date( recordDate );
		if( recordStdDate.getFullYear()%4 == 0 ){
			secondOfTimeunit = 366*24*60*60; //366 days
		}else{
			secondOfTimeunit = 365*24*60*60; //365 days
		}
	}

	return secondOfTimeunit;
}
computeRestSecondOfDay = function( recorditem, timeUnit )
{
	switch( timeUnit ){
		case "DAY":
			var timeString = recorditem.StartTime;

			if( timeString.indexOf( "AM" ) != -1 ){
				var time = timeString.split( "AM" );
				var timeAry = time[0].split( ":" );
				timeAry[0] = parseInt(timeAry[0]); //hour
				timeAry[1] = parseInt(timeAry[1]); //minute
			}

			if( timeString.indexOf("PM") != -1 ){
				var time = timeString.split( "PM" );
				var timeAry = time[0].split( ":" );
				timeAry[0] = ( parseInt(timeAry[0]) == 12 ) ? parseInt(timeAry[0]) : (parseInt(timeAry[0])+12); //hour
				timeAry[1] = parseInt(timeAry[1]); //minute
			}

			var duringSecond = ( timeAry[0]*60 + timeAry[1] )*60; //second
			return duringSecond;
		break;

		case "MONTH":
			var startOfMonth = 0;

			var startOfDay = computeRestSecondOfDay( recorditem, "DAY" );
			var recordDate = new Date( recorditem.StartDate );

			if( recordDate.getDate() == 1 ){
				startOfMonth = startOfDay;
			}else{
				startOfMonth = (recordDate.getDate()-1)*24*60*60 + startOfDay;
			}

			return startOfMonth;
		break;

		case "YEAR":
			var startOfYear = 0;

			var startOfMonth = computeRestSecondOfDay( recorditem, "MONTH" );
			var recordDate = new Date( recorditem.StartDate );

			if( recordDate.getMonth() == 0 ){
				//means it's Jan
				startOfYear = startOfMonth;
			}else{
				var startOfDayYearDate = new Date( recordDate.getMonth()+'/1/'+recordDate.getFullYear() );
				startOfYear = (startOfDayYearDate-recordDate)/1000 + startOfMonth;
			}

			return startOfYear;
		break;
	}
}

tabClick = function( allTabUnitObj, userChoseUnit, chosedColor )
{
	for( key in allTabUnitObj ){
		if( key == userChoseUnit ){
			allTabUnitObj[key].bgColor = chosedColor.bg;
			allTabUnitObj[key].fontColor = chosedColor.font;
			continue;
		}
		
		allTabUnitObj[key].bgColor = chosedColor.font;
		allTabUnitObj[key].fontColor = chosedColor.bg;
	}
}

ErrorCodePaser = function( php_errorCode )
{
	if( isErrorCode( php_errorCode ) == true ){
		var errorAry = php_errorCode.split("__");
		return errorAry[1];
	}
}

isErrorCode = function( data )
{
	try{
		var errorAry = data.split("__");
		if( errorAry.length == 3 ){
			return true;
		}
	}catch( err ){
		//do nothing	
	}

	return false;
}
//encode layout
	b64WriteContentToFile = function( szDevice, aryLayout )
	{
		var szLayoutContent = "<LayoutSetting>\n";
		szLayoutContent = szLayoutContent.concat("  <Name>" + aryLayout['name'] + "</Name>\n");
		szLayoutContent = szLayoutContent.concat("  <Device>" + szDevice + "</Name>\n");
		
		if( szDevice == 'web' ){
			//listView, bigView
			szLayoutContent = szLayoutContent.concat( CreateWebListViewContent(aryLayout['web']['listView']) );
			szLayoutContent = szLayoutContent.concat( CreateWebBigViewContent(aryLayout['web']['bigView']) );
		}

		//return szLayoutContent;
		return Base64.encode(szLayoutContent);
	}
	CreateWebListViewContent = function( aryListView )
	{
		//create content
		var szListContent = "  <ViewType value=\'listView\'> \n";
		for( var key in aryListView ){
			var comContent;
			if( typeof aryListView[key][0] == "undefined" ){
				comContent = "    <Component name=\'\' source=\'\' comValue=\'" + key + "\' /> \n";
				continue;
			}
			comContent = "    <Component name=\'" + aryListView[key][0] + "\' source=\'" + aryListView[key][1] + "\' comValue=\'" + key + "\' prefixName=\'" + aryListView[key][2] + "\' /> \n";
			szListContent = szListContent.concat( comContent );
		}
		szListContent = szListContent.concat("  </ViewType> \n");

		return szListContent;
	}
	CreateWebBigViewContent = function( aryBigView )
	{
		var szListContent = "  <ViewType value=\'bigView\'> \n";
		
		for( var key in aryBigView ){
			var comContent = "    <Location name=\'" + key +"\'> \n";
			for( var subKey in aryBigView[key] ){
				if( typeof aryBigView[key][subKey][0] == "undefined" ){
					comContent = comContent.concat("      <Component name=\'\' source=\'\' size=\'\' comValue=\'" + subKey + "\' /> \n");
					continue;
				}
				comContent = comContent.concat("      <Component name=\'" + aryBigView[key][subKey][0] + "\' source=\'" + aryBigView[key][subKey][2] + "\' size=\'" + aryBigView[key][subKey][1] + "\' comValue=\'" + subKey + "\' prefixName=\'" + aryBigView[key][subKey][3] + "\' /> \n");
			}
			comContent = comContent.concat("    </Location> \n");
			szListContent = szListContent.concat( comContent );
		}

		szListContent = szListContent.concat("  </ViewType> \n");

		return szListContent;
	}
//decode layout
	b64DataToLayoutJSON = function( szDevice, b64Data )
	{
		var szLauoutSource = Base64.decode( b64Data );
		var layoutJSON = {};
		var tmpString;
		//get layout name
		tmpString = szLauoutSource.split("<Name>");
		tmpString = tmpString[1].split("</Name>");
		layoutJSON['name'] = tmpString[0];
		
		//get layout component
		if( szDevice == 'web' ){
			layoutJSON['web'] = new Object();
			layoutJSON['web']['listView'] = new Object();
			layoutJSON['web']['bigView'] = new Object();
			layoutJSON['web']['listView'] = GetWebListViewObjFromSouce( szLauoutSource );
			layoutJSON['web']['bigView'] = GetWebBigViewObjFromSouce( szLauoutSource );
		}

		return layoutJSON;
	}
	GetWebListViewObjFromSouce = function( szLauoutSource )
	{
		var listViewObj = {};
		var tmpString = szLauoutSource.split("<ViewType value=\'listView\'>");
		tmpString = tmpString[1].split("</ViewType>");
		tmpString = tmpString[0].split("<Component");
		
		for( var i=1; i<tmpString.length; i++){
			var tmpValue = tmpString[i].split("\'");
			
			//tmpValue[5]=comValue, tmpValue[3]=source, tmpValue[1]=name, tmpValue[7]=prefixNmae
			listViewObj[tmpValue[5]] = [];
			listViewObj[tmpValue[5]].push(tmpValue[1]);
			listViewObj[tmpValue[5]].push(tmpValue[3]);
			listViewObj[tmpValue[5]].push(tmpValue[7]);
		}
		return listViewObj;
	}
	GetWebBigViewObjFromSouce = function( szLauoutSource )
	{
		var bigView = {};
		var tmpString = szLauoutSource.split("<ViewType value=\'bigView\'>");
		tmpString = tmpString[1].split("</ViewType>");
		tmpString = tmpString[0].split("<Location name=\'");
		
		for( var i=1; i<tmpString.length; i++){
			var tmpLocaValue = tmpString[i].split("\'>");
			
			bigView[tmpLocaValue[0]] = new Object();

			var tmpCom = tmpLocaValue[1].split("<Component ");

			for( var j=1; j<tmpCom.length; j++ ){
				var subTmpValue = tmpCom[j].split("\'");
				//subTmpValue[5]=size, subTmpValue[3]=source, subTmpValue[1]=name, tmpVaule[7]=comValue, tmpValue[9]=prefixName
				bigView[tmpLocaValue[0]][subTmpValue[7]] = [];
				bigView[tmpLocaValue[0]][subTmpValue[7]].push(subTmpValue[1]);
				bigView[tmpLocaValue[0]][subTmpValue[7]].push(subTmpValue[5]);
				bigView[tmpLocaValue[0]][subTmpValue[7]].push(subTmpValue[3]);
				bigView[tmpLocaValue[0]][subTmpValue[7]].push(subTmpValue[9]);
			}
		}

		return bigView;
	}

//command
	GetCommandFromCmdList = function( CmdHint )
	{
		switch( CmdHint ){
			//diagnosis
				case "R_Bit":
					return "Read_R";
				break;
				case "I_Bit":
					return "Read_I";
				break;
				case "O_Bit":
					return "Read_O";
				break;
				case "C_Bit":
					return "Read_C";
				break;
				case "S_Bit":
					return "Read_S";
				break;
				case "A_Bit":
					return "Read_A";
				break;
			//fileTransfer
				case "NcFile":
					return "Get_nc_file_list";
				break;
				case "Ladder":
					return;
				break;
				case "Param":
					return;
				break;
				case "Macro":
					return;
				break;
		}
	}

var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = Base64._utf8_encode(input);

	    while (i < input.length) {

	        chr1 = input.charCodeAt(i++);
	        chr2 = input.charCodeAt(i++);
	        chr3 = input.charCodeAt(i++);

	        enc1 = chr1 >> 2;
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	        enc4 = chr3 & 63;

	        if (isNaN(chr2)) {
	            enc3 = enc4 = 64;
	        } else if (isNaN(chr3)) {
	            enc4 = 64;
	        }

	        output = output +
	        Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
	        Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);

	    }

	    return output;
	},

	// public method for decoding
	decode : function (input) {
	    var output = "";
	    var chr1, chr2, chr3;
	    var enc1, enc2, enc3, enc4;
	    var i = 0;

	    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	    while (i < input.length) {

	        enc1 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc2 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc3 = Base64._keyStr.indexOf(input.charAt(i++));
	        enc4 = Base64._keyStr.indexOf(input.charAt(i++));

	        chr1 = (enc1 << 2) | (enc2 >> 4);
	        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	        chr3 = ((enc3 & 3) << 6) | enc4;

	        output = output + String.fromCharCode(chr1);

	        if (enc3 != 64) {
	            output = output + String.fromCharCode(chr2);
	        }
	        if (enc4 != 64) {
	            output = output + String.fromCharCode(chr3);
	        }

	    }

	    output = Base64._utf8_decode(output);

	    return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
	    string = string.replace(/\r\n/g,"\n");
	    var utftext = "";

	    for (var n = 0; n < string.length; n++) {

	        var c = string.charCodeAt(n);

	        if (c < 128) {
	            utftext += String.fromCharCode(c);
	        }
	        else if((c > 127) && (c < 2048)) {
	            utftext += String.fromCharCode((c >> 6) | 192);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }
	        else {
	            utftext += String.fromCharCode((c >> 12) | 224);
	            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	            utftext += String.fromCharCode((c & 63) | 128);
	        }

	    }

	    return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
	    var string = "";
	    var i = 0;
	    var c = c1 = c2 = 0;

	    while ( i < utftext.length ) {

	        c = utftext.charCodeAt(i);

	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i+1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i+1);
	            c3 = utftext.charCodeAt(i+2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }

	    }
	    return string;
	}
}