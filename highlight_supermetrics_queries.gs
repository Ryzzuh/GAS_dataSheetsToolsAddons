const getQueries = (sheet) => {
  const data = 
  sheet
  .getRange(19,5,sheet.getLastRow())
  .getValues()
  .filter( val => val[0].indexOf('$')>-1 ) // does cell value look like a cell address
  .map( val => val[0].split(":")[0] ) // take the first part of the cell address
  return data
}

const getSheet = (sheetName) => SpreadsheetApp.getActive().getSheetByName(sheetName)

const highlightQueries = () => {
  const ss = SpreadsheetApp.getActive()
  const sheet = ss.getSheetByName('SupermetricsQueries')
  if(sheet){
  getQueries(getSheet('SupermetricsQueries'))
  .forEach(q_add => ss.getRange(q_add).setBackground('#db4527').setFontWeight('bold').setFontStyle('italic'))
  return 
} throw 'no supermetrics queries found'
}