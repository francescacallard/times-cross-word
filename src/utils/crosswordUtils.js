// src/utils/crosswordUtils.js

export const createGrid = (data) => {
  const { dimensions, entries } = data;
  const { rows, cols } = dimensions;

  // Initialize grid with empty cells
  const newGrid = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({ letter: '', number: null }))
  );

  // Populate the grid with words
  entries.forEach(entry => {
    const { position, direction, solution, number } = entry;
    const { x, y } = position;

    if (x < 0 || y < 0 || x >= cols || y >= rows) {
      throw new Error(`Invalid position for word: ${solution}`);
    }

    for (let i = 0; i < solution.length; i++) {
      const currentX = direction === 'across' ? x + i : x;
      const currentY = direction === 'across' ? y : y + i;

      if (currentX >= cols || currentY >= rows) {
        throw new Error(`Word ${solution} extends beyond grid boundaries`);
      }

      if (newGrid[currentY][currentX].letter !== '' && newGrid[currentY][currentX].letter !== solution[i]) {
        throw new Error(`Conflict at position (${currentX}, ${currentY}) for word ${solution}`);
      }

      newGrid[currentY][currentX] = {
        letter: solution[i],
        number: i === 0 ? number : null
      };
    }
  });

  return newGrid;
};