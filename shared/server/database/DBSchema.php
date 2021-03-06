<?php
	//cnc table
	$CNC = array(
		"TABLE"			=> "cnc",
		"ALL"			=> "cnc.*",
		"ID"			=> "cnc.cnc_id",
		"SERIALNO"		=> "cnc.serial_no",
		"MACHINE"		=> "cnc.machine",
		"MACHINETYPE"	=> "cnc.machine_type",
		"VERSION"		=> "cnc.version",
		"GROUPID"		=> "cnc.cnc_group_id",
		"IP"			=> "cnc.ip",
		"MACADDR"		=> "cnc.mac_addr",
		"NAME"			=> "cnc.name",
		"IMG"			=> "cnc.img",
	);
	
	//cnc_alarm table
	$CNCALARM = array(
		"TABLE"			=> "cnc_alarm",
		"ALL"			=> "cnc_alarm.*",
		"CNCID"			=> "cnc_alarm.cnc_id",
		"ALARMMSG"		=> "cnc_alarm,alarm_msg",
		"ALARMTIME"		=> "cnc_alarm.alarm_time",
		"UPDATETIME"	=> "cnc_alarm.update_time",
	);
	
	//cnc_alarm_history table
	$CNCALARMHISTORY = array(
		"TABLE"			=> "cnc_alarm_history",
		"ALL"			=> "cnc_alarm_history.*",
		"CNCID"			=> "cnc_alarm_history.cnc_id",
		"ALARMHISFILE"	=> "cnc_alarm_history.alarm_history",
	);

	//cnc_group table
	$GROUP = array(
		"TABLE"			=> "cnc_group",
		"ALL"			=> "cnc_group.*",
		"ID"			=> "cnc_group.cnc_group_id",
		"NAME"			=> "cnc_group.name",
		"FACTORYID"		=> "cnc_group.factory_id",
	);

	//cnc_record table
	$CNCRECORD = array(
		"TABLE"				=> "cnc_record",
		"ALL"				=> "cnc_record.*",
		"CNCID"				=> "cnc_record.cnc_id",
		"POWERONTIME"		=> "cnc_record.poweron_time",
		"CYCLETIME"			=> "cnc_record.cycletime",
		"TOTALCYCLETIME"	=> "cnc_record.total_cycletime",
		"PARTCOUNT"			=> "cnc_record.partcount",
		"REQUIRECOUNT"		=> "cnc_record.require_partcount",
		"TOTALCOUNT"		=> "cnc_record.total_partcount",
		"LASTWORKTIME"		=> "cnc_record.lastwork_time",
		"WORKFILE"			=> "cnc_record.workfile",
		"WORKFILEUPDATETIME"=> "cnc_record.workfile_updatetime",
		"UPDATETIME"		=> "cnc_record.update_time",
	);

	//cnc_routine table
	$CNCROUTINE = array(
		"TABLE"			=> "cnc_routine",
		"ALL"			=> "cnc_routine.*",
		"ROUTINEID"		=> "cnc_routine.routine_id",
		"COMPANYID"		=> "cnc_routine.company_id",
		"NAME"			=> "cnc_routine.name",
		"ROUTINE"		=> "cnc_routine.routine",
	);

	//cnc_schedule table
	$CNCSCHEDULE = array(
		"TABLE"			=> "cnc_schedule",
		"ALL"			=> "cnc_schedule.*",
		"SCHEDULEID"	=> "cnc_schedule.cnc_schedule_id",
		"ROUTINEID"		=> "cnc_schedule.cnc_routine_id",
		"FACTORYID"		=> "cnc_schedule.cnc_fid",
		"GROUPID"		=> "cnc_schedule.cnc_gid",
		"CNCID"			=> "cnc_schedule.cnc_id",
	);

	//cnc_status table
	$CNCSTATUS = array(
		"TABLE"			=> "cnc_status",
		"ALL"			=> "cnc_status.*",
		"STATUSID"		=> "cnc_status.cnc_status_id",
		"STATUS"		=> "cnc_status.status",
		"MODE"			=> "cnc_status.mode",
		"ALARM"			=> "cnc_status.alarm",
		"EMG"			=> "cnc_status.emg",
		"MAINPROG"		=> "cnc_status.main_prog",
		"CURPROG"		=> "cnc_status.cur_prog",
		"CNCID"			=> "cnc_status.cnc_id",
		"UPDATETIME"	=> "cnc_status.update_time",
	);

	//cnc_time table
	$CNCTIME = array(
		"TABLE"			=> "cnc_time",
		"ALL"			=> "cnc_time.*",
		"TIMESTATUS"	=> "cnc_time.TimeStatus",
		"TIMESTART"		=> "cnc_time.TimeStart",
		"TIMEEXPIRE"	=> "cnc_time.TimeExpire",
		"TIMEREMAIN"	=> "cnc_time.TimeRemain",
		"TIMECURRENT"	=> "cnc_time.TimeCurrent",
		"CNCID"			=> "cnc_time.cnc_id",
		"TIMEOFOPENING"	=> "cnc_time.TimeOfOpening",
		"AGENTTIME"		=> "cnc_time.update_time",
	);

	//company table
	$COMPANY = array(
		"TABLE"			=> "company",
		"ALL"			=> "company.*",
		"ID"			=> "company.company_id",
		"PASSWORD"		=> "company.pwd",
		"NAME"			=> "company.name",
		"INFOMATION"	=> "company.info",
		"USER"			=> "company.user",
		"IMG"			=> "company.img",
		"SMALLLOGO"		=> "company.small_logo",
	);

	$FACTORY = array(
		"TABLE"			=> "factory",
		"ALL"			=> "factory.*",
		"ID"			=> "factory.factory_id",
		"ADDRESS"		=> "factory.addr",
		"TELPHONE"		=> "factory.tel",
		"NAME"			=> "factory.name",
		"EXPEXTWORKTIME"=> "factory.expected_work_time",
		"COMPANYID"		=> "factory.company_id",
	);

	$SYSDEFAULTLAYOUT = array(
		"TABLE"			=> "system_default_layout",
		"ALL"			=> "system_default_layout.*",
		"ID"			=> "system_default_layout.default_layout_id",
		"DEVICE"		=> "system_default_layout.layout_device",
		"NAME"			=> "system_default_layout.layout_name",
		"DETAIL"		=> "system_default_layout.layout_detail",
		"FILE"			=> "system_default_layout.layout_file",
		"UPDATETIME"	=> "system_default_layout.update_time",
	);

	$COMPANYLAYOUT = array(
		"TABLE"			=> "company_layout",
		"ALL"			=> "company_layout.*",
		"LAYOUTID"		=> "company_layout.layout_id",
		"COMPANYID"		=> "company_layout.company_id",
		"LAYOUTDEVICE"	=> "company_layout.layout_device",
		"LAYOUTNAME"	=> "company_layout.name",
		"LAYOUTFILE"	=> "company_layout.file",
		"UPDATETIME"	=> "company_layout.update_time",
	);

	$CNCCOMMAND = array(
		"TABLE"			=> "cnc_command",
		"ALL"			=> "cnc_command.*",
		"WID"			=> "cnc_command.wid",
		"CNCID"			=> "cnc_command.cnc_id",
		"COMMAND"		=> "cnc_command.command",
		"PARAMETER1"	=> "cnc_command.parameter_1",
		"PARAMETER2"	=> "cnc_command.parameter_2",
		"WEBTIME"		=> "cnc_command.web_time",
	);

	$CNCCOMMANDRESULT = array(
		"TABLE"			=> "cnc_command_result",
		"ALL"			=> "cnc_command_result.*",
		"WID"			=> "cnc_command_result.wid",
		"PARAMETER1"	=> "cnc_command_result.parameter_1",
		"PARAMETER2"	=> "cnc_command_result.parameter_2",
		"AGENTTIME"		=> "cnc_command_result.agent_time",
	);

	$CNCVARIABLE = array(
		"TABLE"			=> "cnc_variable",
		"ALL"			=> "cnc_variable.*",
		"WID"			=> "cnc_variable.wid",
		"CNCID"			=> "cnc_variable.cnc_id",
		"TYPE"			=> "cnc_variable.type",
		"NO"			=> "cnc_variable.no",
		"VALUE"			=> "cnc_variable.value",
		"AGENTTIME"		=> "cnc_variable.agent_time",
	);

	$CNCNCDIR = array(
		"TABLE"			=> "cnc_nc_dir",
		"ALL"			=> "cnc_nc_dir.*",
		"CNCID"			=> "cnc_nc_dir.cnc_id",
		"NCNAMELIST"	=> "cnc_nc_dir.ncfile_name_list",
		"NCSIZELIST"	=> "cnc_nc_dir.ncfile_size_list",
		"NCDATELIST"	=> "cnc_nc_dir.ncfile_date_list",
		"AGENTTIME"		=> "cnc_nc_dir.agent_time",
	);

	$CNCNCFILES = array(
		"TABLE"			=> "cnc_ncfiles",
		"ALL"			=> "cnc_ncfiles.*",
		"CNCID"			=> "cnc_ncfiles.cnc_id",
		"NAME"			=> "cnc_ncfiles.name",
		"FILE"			=> "cnc_ncfiles.file",
		"FILEUPLOADTIME"=> "cnc_ncfiles.file_upload_time",
	);

	$CNCLADFILES = array(
		"TABLE"			=> "cnc_sysfiles",
		"ALL"			=> "cnc_sysfiles.*",
		"CNCID"			=> "cnc_sysfiles.cnc_id",
		"NAME"			=> "cnc_sysfiles.name",
		"TYPE"			=> "cnc_sysfiles.type",
		"FILE"			=> "cnc_sysfiles.file",
		"FILEUPLOADTIME"=> "cnc_sysfiles.file_upload_time",
	);

	$CNCOFFSET = array(
		"TABLE"			=> "cnc_toolset",
		"ALL"			=> "cnc_toolset.*",
		"CNCID"			=> "cnc_toolset.cnc_id",
		"NO"			=> "cnc_toolset.no",
		"VALUE"			=> "cnc_toolset.value",
		"UPDATETIME"	=> "cnc_toolset.update_time",
	);

	$AGENTDEBUGINFO = array(
		"TABLE"			=> "agent_debug_info",
		"ALL"			=> "agent_debug_info.*",
		"CNCID"			=> "agent_debug_info.cnc_id",
		"TIMESTAMP"		=> "agent_debug_info.timestamp",
		"LOG"			=> "agent_debug_info.log",
	);
	
	$FACTORYSHIFTSCHEDULE = array(
		"TABLE"			=> "factory_shift_schedule",
		"ALL"			=> "factory_shift_schedule.*",
		"FACTORYID"		=> "factory_shift_schedule.factory_id",
		"SCHEDULETIME"	=> "factory_shift_schedule.schedule_time",
		"SHIFTSCHEDULE"	=> "factory_shift_schedule.shift_schedule",
		"UPDATETIME"	=> "factory_shift_schedule.update_time",
	);

	$COMPANYDASHBOARDITEMNAMES = array(
		"TABLE"			=> "company_dashboard_item_names",
		"ALL"			=> "company_dashboard_item_names.*",
		"COMPANYID"		=> "company_dashboard_item_names.company_id",
		"ITEMNAMES"		=> "company_dashboard_item_names.item_names",
		"UPDATETIME"	=> "company_dashboard_item_names.update_time",
	);

	$CNCPARAMSCHEMA = array(
		"TABLE"			=> "cnc_param_schema",
		"ALL"			=> "cnc_param_schema.*",
		"CNCID"			=> "cnc_param_schema.cnc_id",
		"PARAMSCHEMA"	=> "cnc_param_schema.param_schema",
		"UPDATETIME"	=> "cnc_param_schema.update_time",
	);

	$CNCAGENTVERSION = array(
		"TABLE"			=> "cnc_agent_version",
		"ALL"			=> "cnc_agent_version.*",
		"CNCID"			=> "cnc_agent_version.cnc_id",
		"AGENTVERSION"	=> "cnc_agent_version.agent_version",
		"APIVERSION"	=> "cnc_agent_version.api_version",
		"UPDATETIME"	=> "cnc_agent_version.update_time",
	);

	$FACTORYSLIDERSETTING = array(
		"TABLE"			=> "factory_slider_setting",
		"ALL"			=> "factory_slider_setting.*",
		"FACTORYID"		=> "factory_slider_setting.factory_id",
		"SLIDERSETTING"	=> "factory_slider_setting.slider_setting",
		"UPDATETIME"	=> "factory_slider_setting.update_time",
	);

	$IPCAM = array(
		"TABLE"			=> "factory_ipcam",
		"ALL"			=> "factory_ipcam.*",
		"IPCAMID"		=> "factory_ipcam.camera_id",
		"IPCAMNAME"		=> "factory_ipcam.camera_name",
		"GROUPID"		=> "factory_ipcam.group_id",
		"IPCAMRTSP"		=> "factory_ipcam.camera_rtsp_url",
	);

	$AGENTVERSION = array(
		"TABLE"			=> "agent_version",
		"ALL"			=> "agent_version.*",
		"APIVERSION"	=> "agent_version.api_version",
		"AGENTVERSION"	=> "agent_version.agent_version",
		"AGENTFILE"		=> "agent_version.agent_file",
		"DESCRIPTION"	=> "agent_version.description",
		"UPDATETIME"	=> "agent_version.update_time",
	);

	$COMPANYUSER = array(
		"TABLE"			=> "company_user",
		"ALL"			=> "company_user.*",
		"COMPANYID"		=> "company_user.company_id",
		"USERNAME"		=> "company_user.user_name",
		"USERPASSWORD"	=> "company_user.user_password",
		"AUTHORITYID"	=> "company_user.authority_template_id",
		"ENABLE"		=> "company_user.enable",
	);

	$COMPANYAUTHORITYTEMPLATE = array(
		"TABLE"			=> "company_authority_template",
		"ALL"			=> "company_authority_template.*",
		"COMPANYID"		=> "company_authority_template.authority_template_id",
		"USERNAME"		=> "company_authority_template.name",
		"USERPASSWORD"	=> "company_authority_template.authority",
		"UPDATETIME"	=> "company_authority_template.update_time",
	);

?>