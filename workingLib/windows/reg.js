
var HKLM = 0x80000002;

var rtn = regGetSubKeys(".", "SOFTWARE\\Microsoft")
if ( rtn.Results == 0 )
{
  for (var idx=0;idx<rtn.SubKeys.length;idx++)
  {
    WScript.Echo(rtn.SubKeys[idx]);
  }
}
function regGetSubKeys(strComputer, strRegPath) 
{ 
  try 
  { 
    var aNames = null; 
    var objLocator     = new ActiveXObject("WbemScripting.SWbemLocator"); 
    var objService     = objLocator.ConnectServer(strComputer, "root\\default"); 
    var objReg         = objService.Get("StdRegProv"); 
    var objMethod      = objReg.Methods_.Item("EnumKey"); 
    var objInParam     = objMethod.InParameters.SpawnInstance_(); 
    objInParam.hDefKey = HKLM; 
    objInParam.sSubKeyName = strRegPath; 
    var objOutParam = objReg.ExecMethod_(objMethod.Name, objInParam); 
    switch(objOutParam.ReturnValue) 
    { 
      case 0:
        aNames = (objOutParam.sNames != null) ? objOutParam.sNames.toArray(): null; 
        break; 
 
      case 2:
        aNames = null; 
        break; 
    } 
    return {Results : 0, SubKeys : aNames}; 
  } 
  catch(e)   
  {  
    return {Results: e.number, SubKeys : e.description}  
  } 
}
