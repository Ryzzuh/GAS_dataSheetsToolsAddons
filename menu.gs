/*
tagtools: https://script.google.com/a/atomic212.com.au/d/1tGI0dUHZdTnuL5MvKN6L4B-qzkb35tBN4u3TNYO37q71HoJave9vLonh/edit?mid=ACjPJvG598yPL2p3fbMdHw4SE1cqT5o8nNeyx7FtiDTONlX3ygYCDHQfVyDJ8zQynJvSxcvSVXYDdPdGJNw4fEGTPRRdlq3bJwe_cdXQiFSALJyuSN01yma4u9QV-qhYLgGkx-QzvHPFrrwZ&uiv=2

https://console.cloud.google.com/apis/api/appsmarket-component.googleapis.com/googleapps_sdk?project=sheets-tools-addon
*/


//https://yagisanatode.com/2019/02/22/google-apps-script-why-isnt-my-add-on-showing-up-in-the-add-on-menu-when-i-test-it/
/*
 * ***OPTION 2 - Create an add-on menu and display an alert***
 * when activated.
 * This one DOES WORK when tested as an add-on!
 * This example maintains the Globally useful variables but encases them in an object that returns them
 * as a function.
 *
 * @ref https://developers.google.com/gsuite/add-ons/concepts/addon-authorization#installed_versus_enabled
 * submenus are a no-no
 */

// **** Globals ****
var CELL_VAL = "B4"


var sheet = function(){
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()}
var ui = function(){
    return SpreadsheetApp.getUi()}

//***********************************************************************************
//Creates menu item.
/*function onOpen(e){
  ui().createAddonMenu()
    .addItem("My Addon","runAlert_")
    .addToUi();
};*/

function onInstall(e){
  onOpen(e);
};

//***********************************************************************************
//Run an alert to say all is working
function runAlert_(){

  
  var answer = sheet().getRange(CELL_VAL).getValue();
  
  ui().alert(("It's A working!!!"+
            "\nAnswer is: "+
            "\n"+answer));
};


function onOpen(e) {
  //var ui = SpreadsheetApp.getUi()
  
  /*var gtm_trigger = ui.createAddonMenu('Trigger')
  .addItem('Extract GA tag', 'tagtool.get_trigger_types')    
  .addItem('Update Notes/Delete', 'tagtool.updateTrigger')
    
  var gtm_tag = ui.createAddonMenu('Tag')
  .addItem('Extract DCM Data', 'tagtool.extract_dcm_tag')
  .addItem('Update Notes/Delete', 'tagtool.updateTag')
    
  var main_gtm = ui.createAddonMenu('Simo Hava GTM Tool Enhancement ')
  .addSubMenu(gtm_trigger)
  .addSubMenu(gtm_tag)  
  
  var data_tools =  ui.createAddonMenu('-data addon tools-')  
  .addItem('View and Bold All Headers', 'freezeAndBoldAllHeaders')
  .addItem('Highlight Supermetrics Queries', 'highlightQueries') 
  
    ui().createAddonMenu()
    .addSubMenu(gtm_trigger)
    .addSubMenu(gtm_tag)
    .addSubMenu(data_tools)*/
  
  
  ui().createAddonMenu()
  .addItem('View and Bold All Headers', 'freezeAndBoldAllHeaders')
  .addItem('Highlight Supermetrics Queries', 'highlightQueries') 
  .addSeparator()
  .addItem('Delete extra Rows and Columns (for this sheet)', 'delForThisSheet')
  .addItem('Delete extra Rows and Columns (for all sheets)', 'delForAllSheets')
  .addSeparator()
  .addItem('Simo GTM | Tag - Extract DCM', 'tagtool.extract_dcm_tag')
  .addItem('Simo GTM | Tag - Update/Delete ', 'tagtool.updateTag')
  .addSeparator()
  .addItem('Simo GTM | Trigger - Extract DCM', 'tagtool.get_trigger_types')    
  .addItem('Simo GTM | Trigger - Update Notes/Delete', 'tagtool.updateTrigger')
  .addSeparator()

  .addItem('GA - Solution Doc | Get All Json','gatool.getGAJSON_all')
  
  .addItem('  Update  1', 'gatool.updateUser')
  .addItem('  Update  2a/2c','gatool.updateViews')
  .addItem('  Update  2b', 'gatool.updateAccounts')
  .addItem('  Update  2d', 'gatool.updateAccounts')
  .addItem('  Update  5a','gatool.updateGoals')
  .addItem('  Update All Sheets!!','gatool.updateAll')
  .addItem('  Clear Sheets', 'gatool.Clearsheets')
  .addToUi();
  
  
}


