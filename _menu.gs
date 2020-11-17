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


function onInstall(e){
  onOpen(e);
};

const onOpen = (e) => {
  const ui = SpreadsheetApp.getUi()
  //var menu = ui.createMenu('**DATA**'); // for non-addons
  const menu = ui.createAddonMenu(); // for addons
  menu
  //.addItem('test', 'test_menu')
  .addItem('BQTools - Initialise BigQueryTools', 'init_BQtools')
  .addItem('BQTools - Create BQ Table', 'showBQToolDialog')
  .addSeparator()
  .addItem('Sheet Formatter - View and Bold ALL Headers', 'freezeAndBoldAllHeaders')
  .addItem('Sheet Formatter - View and Bold ALL Top Two Rows', 'freezeAndBoldAllTwoRows')
  .addItem('Sheet Formatter - Highlight Supermetrics Queries', 'highlightQueries')
  .addItem('Sheet Formatter - Un-Highlight Supermetrics Queries', 'clearSupermeticsHighlights')
  .addItem('Sheet Formatter - Highlight ALL formulas (all sheets)', 'highlightAllFormulas')
  .addItem('Sheet Formatter - Un-Highlight ALL formulas', 'clearHighlights')
  .addItem('Sheet Formatter - Delete extra Rows and Columns (for this sheet)', 'delForThisSheet')
  .addItem('Sheet Formatter - Delete extra Rows and Columns (for all sheets)', 'delForAllSheets')
  .addSeparator()
  .addItem('Check for references to active sheet', 'checkSheetReferenced')
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


const showBQToolDialog = () => {
  var html = HtmlService.createHtmlOutputFromFile('create_GSHEET-linked-table')
      .setWidth(800);
  //html.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.
      .showModalDialog(html, 'Load to BigQuery');
}