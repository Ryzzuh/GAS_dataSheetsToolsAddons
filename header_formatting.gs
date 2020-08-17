 const freezeAndBoldAllHeaders = () => {
  SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheets()
  .filter( s => s.getType() == 'GRID' )
  .forEach(s=>freezeAndBoldHeader(s));
}
  
  const freezeAndBoldHeader = (sheet) => {
  sheet.setFrozenRows(1);
  sheet.getRange(1,1,1, sheet.getMaxColumns()).setFontWeight("bold");
}