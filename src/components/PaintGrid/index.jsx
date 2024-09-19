import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const COLORS = {
  white: "white",
  black: "black",
};

const GRID_ROWS = 13;
const GRID_COLUMNS = 13;

const isMouseDown = () => window.mouseDownState;

window.addEventListener("mousedown", () => {
  window.mouseDownState = true;
});
window.addEventListener("mouseup", () => {
  window.mouseDownState = false;
});

export const PaintGrid = () => {
  const [activeColor, setActiveColor] = useState(COLORS.black);
  const [showGrid, setShowGrid] = useState(true);
  const [gridState, setGridState] = useState(
    Array(GRID_ROWS).fill().map(() => Array(GRID_COLUMNS).fill(COLORS.white))
  );

  const clearCells = () => {
    if (window.confirm("Are you sure you want to clear the grid?")) {
      setGridState(Array(GRID_ROWS).fill().map(() => Array(GRID_COLUMNS).fill(COLORS.white)));
    }
  };

  const handleCellChange = useCallback((id, color) => {
    const [col, row] = id.split(',').map(Number);
    setGridState(prevState => {
      const newState = [...prevState];
      newState[row][col] = color;
      return newState;
    });
  }, []);

  const saveGridState = () => {
    const blackCells = [];
    gridState.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === COLORS.black) {
          blackCells.push(`${j},${i}`);
        }
      });
    });
    
    const saveData = {
      gridState: gridState,
      blackCells: blackCells
    };
    
    localStorage.setItem('gridState', JSON.stringify(saveData));
  };

  const loadGridState = () => {
    const savedData = JSON.parse(localStorage.getItem('gridState'));
    if (savedData) {
      setGridState(savedData.gridState);
    }
  };

  return (
    <main>
      <section className="controls">
        <fieldset>
          <legend>
        <CellButton color={activeColor} />
          </legend>
          {Object.entries(COLORS).map(([key, value]) => (
            <CellButton
              key={key}
              title={`Select color: ${key}`}
              color={value}
              onClick={() => setActiveColor(value)}
            />
          ))}
        </fieldset>
        <fieldset className='paint-grid-buttons-container'>
          <button className='paint-grid-buttons' onClick={clearCells}>Clear</button>
          <button className='paint-grid-buttons' onClick={saveGridState}>Save Grid</button>
          <button className='paint-grid-buttons' onClick={loadGridState}>Load Grid</button>
        </fieldset>
      </section>
      <section
        className={["cells", showGrid ? "show-grid" : "hide-grid"].join(" ")}
      >
        {gridState.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cellColor, j) => (
              <Cell 
                key={`${j},${i}`} 
                id={`${j},${i}`} 
                activeColor={activeColor}
                color={cellColor}
                onChange={handleCellChange}
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}

const Cell = ({
  id,
  activeColor,
  color,
  onChange
}) => {
  const handleMouseDown = useCallback(() => {
    onChange(id, activeColor);
  }, [activeColor, id, onChange]);

  const handleMouseOver = useCallback(() => {
    if (isMouseDown()) {
      onChange(id, activeColor);
    }
  }, [activeColor, id, onChange]);

  const handleDoubleClick = useCallback(() => onChange(id, COLORS.white), [id, onChange]);

  return (
    <CellButton
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      color={color}
      title={`A ${color} cell`}
    />
  );
};

const CellButton = ({ color, ...otherProps }) => {
  return (
    <span style={{ backgroundColor: color }} className="cell" {...otherProps} />
  );
};