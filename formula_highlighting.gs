const [fxBgColor, fxFontColor, fxFontWeight, fxFontStyle] = ['#2e5eaa', '#55d6be', "bold", 'italic']

const highlightAllFormulas = () => {
  clearHighlights()
  //const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheets = getGridSheets()
  for (sheet of sheets){
    const formulaAdds = getFormulaAddresses(sheet)
    for (cellAddress of formulaAdds){
      const row = cellAddress.split(":")[0]
      const col = cellAddress.split(":")[1] 
      sheet.getRange(row,col).setBackground('#2e5eaa').setFontColor('#55d6be').setFontWeight("bold").setFontStyle('italic');
    }
  }
}

const clearHighlights = () => {
  //const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheets = getGridSheets()
  sheets.forEach(sheet=>{
    const highlightedCells = getHighlightedCells(sheet)
    highlightedCells.forEach(cellAddress=>{
      const row = cellAddress.split(":")[0]
      const col = cellAddress.split(":")[1]
      const range = sheet.getRange(row, col);
      range.setBackground(null).setFontColor(null).setFontWeight(null).setFontStyle(null);
    })
  })
}

const getHighlightedCells = (sheet) => {
  if(!sheet.getLastRow()) return []
  const range = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
  const bgColorsAdds = range.getBackgrounds().map( (x, row) => x.map( (y, col) => y == '#2e5eaa'?`${row+1}:${col+1}`:''))
  const fontColorsAdds = range.getFontColors().map( (x, row) => x.map( (y, col) => y == '#55d6be'?`${row+1}:${col+1}`:''))
  const bgColorsAddsCleaned = [].concat(...bgColorsAdds.map(z => z.filter(p => p.length>0)))
  const fontColorsAddsCleaned = [].concat(...fontColorsAdds.map(z => z.filter(p => p.length>0)))
  const results = bgColorsAddsCleaned.filter(y=>fontColorsAddsCleaned.includes(y))
  return results
}

const getFormulaAddresses = (sheet) => {
  if(!sheet.getLastRow()) return []
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  const formulaAdds = range.getFormulas().map( (x, row) => x.map( (y, col) => y.length?`${row+1}:${col+1}`:''))
  const formulaAddsCleaned = [].concat(...formulaAdds.map(z => z.filter(p => p!='')))
  return formulaAddsCleaned
}

const getFormulas = (sheet) => {
  if(!sheet.getLastRow()) return []
  const range = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  const formulas = range.getFormulas().map( x => x.map( y => y.length ? y : '' ))
  return formulas
}
