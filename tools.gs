const getGridSheets = () => {
  const sheets = SpreadsheetApp.getActive().getSheets()
  return sheets.filter(s=>s.getType()==SpreadsheetApp.SheetType.GRID)
}