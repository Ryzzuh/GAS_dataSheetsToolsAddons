
const init_BQtools = () => {
  const sheets = SS().getSheets()
  const sheetNames = sheets.map(s=>s.getName())
  
  // if settings DO NOT exist in sheet, create a new one
  !sheetNames.includes('BQTableSettings') 
  ? copyOverSettingsSheet()
  : SSAPP()
  .getUi()
  .alert('settings sheet already exists!') 
}


const copyOverSettingsSheet = () => {
  // copy settings sheet from template and rename the new sheet
  SSAPP()
  .openById('1j57SGnSppmj-IxTo0se5KIdKo5a-RuU77cyDsHHBZL4')
  .getSheetByName('BQTableSettings')
  .copyTo(SS())
  SS()
  .getSheetByName('Copy of BQTableSettings')
  .setName('BQTableSettings')
}

  
const getSettings = () => {
  const sh = SS().getSheetByName('BQTableSettings')
  const settings = sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues()
  return settings
}

  
const doSomething = (data) => {
  console.log('data')
  console.log(data)
  create_gsheet_linked_table2(data[1],data[2],data[3],data[0])
}

const createDataset = (PROJECT_ID, DATASET_ID) => {
    const datasetResource = {
    "datasetReference": {
    //"datasetId": `BQT_${DATASET_ID}`,
    "datasetId": DATASET_ID,  
    "projectId": PROJECT_ID
    }
  }
  BigQuery.Datasets.insert(datasetResource, PROJECT_ID)
  return true
}

const test_createDataset = () => {
  Logger.log(createDataset('atomic-internal', 'abc123'))
}

const datasetExists = (PROJECT_ID, DATASET_ID) => {
  const dataSets = BigQuery.Datasets.list(PROJECT_ID)
  const dataSetIds = dataSets.datasets.map(ds=>ds.datasetReference.datasetId)
  return dataSetIds.includes(DATASET_ID)
}


const create_table = (PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range) => {
  const tableResource = createTableResource(PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range)
  BigQuery.Tables.insert(tableResource, PROJECT_ID, DATASET_ID)
  return true
}


const create_gsheet_linked_table2 = (PROJECT_ID, DATASET_ID, TABLE_ID, sourceSheetName) => {
    const sheet = SS().getSheetByName(sourceSheetName);
    //Logger.log(SS)
    //Logger.log(sheet)
    const range = sourceSheetName + '!' + sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getA1Notation()//.getDataRegion().getA1Notation()
    const ssid = SS().getId();
    
    
  
    
// check if dataset exists
  datasetExists(PROJECT_ID, DATASET_ID)
      // if dataset exists, ask if user: add table to it?
      ?
      UI_insertToExistingDataset(DATASET_ID)
      //// if yes, create, table
      ?
      create_table(PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range) &&
      show_HTML_confirmation(build_table_url(PROJECT_ID, DATASET_ID, TABLE_ID))
      //// if no, exit program
      :
      SSAPP().getUi().alert('user does not want to use existing dataset \n exiting...') // throwError('user does not want to use existing dataset')
      // if dataset not exists, 
      // ask to confirm details
      :
      confirm_details(sourceSheetName)
      //// if details confirmed, create dataset then create table
      //? (() => { createDataset(PROJECT_ID, DATASET_ID); create_table(PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range) })()
      ?
      createDataset(PROJECT_ID, DATASET_ID) &&
      create_table(PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range)
      // if dataset and table created, give the user a url
      ?
      show_HTML_confirmation(build_table_url(PROJECT_ID, DATASET_ID, TABLE_ID))
      // if details refused, exit
      :
      SSAPP().getUi().alert('user did not approve details \n exiting...') //throwError('user did not approve details')
      :
      SSAPP().getUi().alert('something went wrong with creation \n exiting...'); //throwError('something went wrong with creation')
  
  
  
  // build out error codes
  //if(e.details.errors[0].message.includes('Not found: Dataset')){ throw 'dataset not found!!' }    
}
    


const UI_createNewDataset = (DATASET_ID) => {
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = SSAPP().getUi();
  var response = ui.prompt(`create new dataset ${DATASET_ID}`, ui.ButtonSet.YES_NO);
  
  // Process the user's response.
if (response == ui.Button.YES) {return true} else {return false} 
  return response.getSelectedButton() == ui.Button.YES
}

const UI_insertToExistingDataset = (DATASET_ID) => {
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = SSAPP().getUi();
  var response = ui.alert(`are you sure you want to use existing dataset: ${DATASET_ID}`, ui.ButtonSet.YES_NO);
  
  // Process the user's response.
  //if (response == ui.Button.YES) {return true} else {return false}
  return response == ui.Button.YES
}

const test_alert_falsey = () => {
  var ui = SSAPP().getUi();
  var response = ui.alert('are you sure you want to use existing dataset', ui.ButtonSet.YES_NO);
  //Logger.log(response)
  //Logger.log(response == ui.Button.YES)
  //if (response == ui.Button.YES) {Logger.log(true) } else {Logger.log(false)}
  return response == ui.Button.YES
}

const createTableResource = (PROJECT_ID, DATASET_ID, TABLE_ID, ssid, sourceSheetName, range) => {
      var table = {
      tableReference: {
        projectId: PROJECT_ID,
        datasetId: DATASET_ID,
        tableId: TABLE_ID
      },
      externalDataConfiguration:
      {
        "sourceUris": [
          'https://docs.google.com/spreadsheets/d/' + ssid
        ],
        "schema": {
          fields: get_fields(sourceSheetName)//, /:(\w+)\d/i.exec(RANGE)[1])      
        },
        "sourceFormat": 'GOOGLE_SHEETS',
        "maxBadRecords": 100000,
        "autodetect": false,
        "ignoreUnknownValues": true,
        "compression": 'NONE',
        "googleSheetsOptions": {
          "skipLeadingRows": 3,
          "range": range
        }
      }
    }
    return table
}



//////////////////////////////////////////////////////
////////////////////// UTILITIES /////////////////////
//////////////////////////////////////////////////////

const throwError = (e) => {
  throw {e}
}

const show_HTML_confirmation = (url) => {
  var htmlOutput = HtmlService
  .createHtmlOutput('<p>Table created <b><a href="' + url + '" target="_blank">here...</a></b>'
                    + '<p>Please verify and check schema correctly if you selected auto-detect.'
                    + '<p>If issues encountered,please email data@atomic212.com.au')
  .setWidth(500)
  .setHeight(150);
  SSAPP().getUi().showModalDialog(htmlOutput, 'BigQuery Table Created!');
  return true
}


const build_table_url = (projectId, datasetId, tableId) => {
  return 'https://console.cloud.google.com/bigquery?project=atomic-internal&supportedpurview=project'
  + '&p=' + projectId
  + '&d=' + datasetId
  + '&t=' + tableId
  +'&page=table'
}


const confirm_details = (sheetName) => {
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = SSAPP().getUi();
  var response = ui.alert('Source info', `Dataset does not exist. \n A new one will be created for new table from source sheet: ${sheetName} \nProceed?`, ui.ButtonSet.YES_NO);
  
  // Process the user's response.
  if (response == ui.Button.YES) {
    //Logger.log(('The user\'s name is %s.', response.getResponseText());
    return true
  } else if (response == ui.Button.NO) {
    //Logger.log(('The user didn\'t want to provide a name.');
    ui.alert('action cancelled')
    return false
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
    return false
  }
}


function get_fields(sheetName) {
  var sheet = SS().getSheetByName(sheetName);    
  var range = sheet.getRange('A1').getDataRegion()
  var values = range.getValues();
  var data_types = values[0]
  var headers = values[1]
  //var fields = headers.map(function(x,i){return Object.create({name:headers[i], type:data_types[i]})})
  var fields_v1 = headers.map(function(x,i){return {name:headers[i], type:data_types[i]}})
  return fields_v1;
}


//////////////////////////////////////////////////////
////////////////////// TESTS /////////////////////
//////////////////////////////////////////////////////

const test_create_gsheet_linked_table2 = () => {
    create_gsheet_linked_table2('atomic-internal', 'abcnewDataset', 'abcnewTable', 'DCM')
}

const test_get_fields = () => {
   const x = get_fields('DCM')
   Logger.log(x)
}
  
const test_getDataRegion = () => {
  var sheet = SS().getSheetByName('BQTableSettings')
  x = sheet.getName() + '!' + sheet.getRange("C3").getDataRegion().getA1Notation()
  Logger.log(x)
  Logger.log(x.split(':')[1])
  re = /:(\w+)\d/i
  //result = "A2:D4".exec(re)
  result = re.exec("A2:AB4")
  Logger.log(result[1])
}