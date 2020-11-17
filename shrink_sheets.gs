const showPrompt = () => {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.prompt(
      'Options',
      'How many columns and rows to leave blank? (Default=0)',
      ui.ButtonSet.OK_CANCEL);
  // Process the user's response.
  var button = result.getSelectedButton();
  var num = result.getResponseText();
  if (button == ui.Button.OK) {
    // User clicked "OK".
    if(num==''){return 0}
    return num
  } return -1
}

const delForThisSheet = () => {
  const feather = showPrompt()
  const sheet = ACTIVESHEET()
    delBlankColumns(sheet, feather)
    delBlankRows(sheet, feather)
}

const delForAllSheets = () => {
  const feather = showPrompt()
  const sheets = getGridSheets()
  for(sheet of sheets){
      delBlankColumns(sheet, feather)
      delBlankRows(sheet, feather)
  }
}


let delBlankColumns = (sheet, feather = 0) => {
  let currentSheet = sheet || ACTIVESHEET()
  const lastColumn = currentSheet.getLastColumn() || 1
  const numBlankColumns = currentSheet.getMaxColumns() - lastColumn
  if(numBlankColumns - feather >0){
    currentSheet.deleteColumns(lastColumn+1, numBlankColumns - feather)
  }
}

let delBlankRows = (sheet, feather = 0) => {
  Logger.log(sheet.getName())
  let currentSheet = sheet || ACTIVESHEET()
  const lastRow = currentSheet.getLastRow() || 1
  const numBlankRows = currentSheet.getMaxRows() - lastRow - currentSheet.getFrozenRows()
  if(numBlankRows - feather >0){
    currentSheet.deleteRows(lastRow+1, numBlankRows)
  }
}

const test_delForBqConnector = () => {
  const sheets = SpreadsheetApp.getActive().getSheets().map(s=>s.getType())
  const sheet = SpreadsheetApp.getActive().getSheetByName('community_kwds_2019_to_202005');
  // const sheet = ACTIVESHEET()
  Logger.log(sheets)
}