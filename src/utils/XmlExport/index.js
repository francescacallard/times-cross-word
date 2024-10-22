function generateCrosswordXml(puzzleData) {
  const xmlDoc = document.implementation.createDocument(null, 'crossword')
  const root = xmlDoc.documentElement

  const grid = xmlDoc.createElement('grid')
  const rows = xmlDoc.createElement('rows')
  rows.textContent = puzzleData.grid.length
  const columns = xmlDoc.createElement('columns')
  columns.textContent = puzzleData.grid[0].length
  grid.appendChild(rows)
  grid.appendChild(columns)
  root.appendChild(grid)

  const clues = xmlDoc.createElement('clues')
  const across = xmlDoc.createElement('across')
  const down = xmlDoc.createElement('down')

  puzzleData.entriesInfo.forEach(([, entry]) => {
    const clueElement = xmlDoc.createElement('clue')
    clueElement.setAttribute('number', entry.entryNum)
    clueElement.setAttribute('answer', entry.wordUsedAcross || entry.wordUsedDown)
    clueElement.textContent = entry.clue

    if (entry.wordUsedAcross) {
      across.appendChild(clueElement.cloneNode(true))
    } 
    if (entry.wordUsedDown) {
      down.appendChild(clueElement)
    }
  })

  clues.appendChild(across)
  clues.appendChild(down)
  root.appendChild(clues)

  const solution = xmlDoc.createElement("solution");
  puzzleData.grid.forEach(row => {
    const rowElement = xmlDoc.createElement("row");
    rowElement.textContent = row.map(cell => cell.value || '.').join('');
    solution.appendChild(rowElement);
  });
  root.appendChild(solution);

  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}

function exportToXml(puzzleData) {
  const xml = generateCrosswordXml(puzzleData);
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'crossword.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


export default exportToXml;