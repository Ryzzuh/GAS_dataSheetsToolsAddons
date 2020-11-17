 const freezeAndBoldAllHeaders = () => {
   getGridSheets()
  .forEach(s=>freezeAndBoldHeader(s));
}

 const freezeAndBoldAllTwoRows = () => {
   getGridSheets()
  .forEach(s=>freezeAndBoldTwoRows(s));
}
  
 const freezeAndBoldHeader = (sheet) => {
  if(sheet.getLastRow>2)sheet.setFrozenRows(1);
  sheet.getRange(1,1,1, sheet.getMaxColumns()).setFontWeight("bold");
}
   
const freezeAndBoldTwoRows = (sheet) => {
  if(sheet.getLastRow>3)sheet.setFrozenRows(2);
  sheet.getRange(1,1,1, sheet.getMaxColumns()).setFontWeight("bold");
}