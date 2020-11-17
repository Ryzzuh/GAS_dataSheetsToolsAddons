// is this sheet referenced? what about as an importrange in another sheet
// maintain an index of all sheets....
const checkSheetReferenced = () => {
  //const ss = SpreadsheetApp.getActiveSpreadsheet()
  // get sheets
  const sheets = SS().getSheets()
  // filter out active sheet
  const thisSheetName = ACTIVESHEET().getName()
  const sheetsToQuery = getGridSheets().filter(sh=>sh.getName()!=thisSheetName)
  // create list to push matches to
  const matches = []
  // for each sheet
  sheetsToQuery.forEach(sh=>{
  const formulas = [].concat(...getFormulaLocations(sh)).filter(z=>z!='')
    formulas.forEach( fx => fx[0].toLowerCase().includes(thisSheetName.toLowerCase()) && matches.push([sh.getName(), fx[1]]))
  })
  Logger.log(matches)
  const ui = SpreadsheetApp.getUi()
  // https://docs.google.com/spreadsheets/d/13Us783FmDLz8-h-XQyEK6LQ74Thi4x8f658_6dc03l0/edit#gid=0&range=G6
  matches.length ? ui.alert(`references to sheet found in \n- ${matches.join('\n- ')}`) : ui.alert('no references found')
}


const getFormulaLocations = (sheet) => {
  if(!sheet.getLastRow()) return []
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  const formulas = range.getFormulas().map((x,xi) => x.map((y,yi) => y.length ? [y,[xi+1,yi+1]] : '' ))
  return formulas
}

const test_getFormulaLocations = () => {
  const formulas = getFormulaLocations(getSheet('Sheet1')).filter(z=>z[0]!='')
  Logger.log(getFormulaLocations(getSheet('Sheet1')))
}


// TODO make a UI service where a user can click the formula location onClick(SpreadsheetApp.setActiveRange(range) and be sent there...
//function doGet() {
//  const url = 
//  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(`<a href='https://docs.google.com/spreadsheets/d/13Us783FmDLz8-h-XQyEK6LQ74Thi4x8f658_6dc03l0/edit#gid=0&range=G6'>Hello, world!</b>`),'popup');
//}