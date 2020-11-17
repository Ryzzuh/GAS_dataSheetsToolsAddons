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
  //const ss = SpreadsheetApp.getActive()
  const sheet = getSheet('SupermetricsQueries')
  if(sheet){
  getQueries(sheet)
  .forEach(q_add => SS().getRange(q_add).setBackground('#db4527').setFontColor('#000001').setFontWeight('bold').setFontStyle('italic'))
  return 
} throw 'no supermetrics queries found'
}


const getSupermetricsHighlightedCells = (sheet) => {
  if(!sheet.getLastRow()) return []
  const range = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
  const bgColorsAdds = range.getBackgrounds().map( (x, row) => x.map( (y, col) => y == '#db4527'?`${row+1}:${col+1}`:''))
  const fontColorsAdds = range.getFontColors().map( (x, row) => x.map( (y, col) => y == '#000001'?`${row+1}:${col+1}`:''))
  const bgColorsAddsCleaned = [].concat(...bgColorsAdds.map(z => z.filter(p => p.length>0)))
  const fontColorsAddsCleaned = [].concat(...fontColorsAdds.map(z => z.filter(p => p.length>0)))
  const results = bgColorsAddsCleaned.filter(y=>fontColorsAddsCleaned.includes(y))
  return results
}

const clearSupermeticsHighlights = () => {
  const sheets = getGridSheets()
  sheets.forEach(sheet=>{
    const highlightedCells = getSupermetricsHighlightedCells(sheet)
    highlightedCells.forEach(cellAddress=>{
      const row = cellAddress.split(":")[0]
      const col = cellAddress.split(":")[1]
      const range = sheet.getRange(row, col);
      range.setBackground(null).setFontColor(null).setFontWeight(null).setFontStyle(null);
    })
  })
}