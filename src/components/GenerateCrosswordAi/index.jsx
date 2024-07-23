import React, { useState, useEffect } from 'react';
import { useApp } from 'context/AppContext';
import { CrosswordGridAi } from 'components/CrosswordGridAi';
import { GeneratePuzzle } from 'components/GeneratePuzzle';
import './styles.css';

export const GenerateCrosswordAi = () => {

  const { crosswordData, setCrosswordData, isLoading, setIsLoading, error, setError, showWordBank, setShowWordBank, showSolution, setShowSolution, showDisplay, setShowDisplay, showLegend, setShowLegend } = useApp(); 

  const generateCrossword = () => {
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:5000/generate-crossword')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCrosswordData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="crossword-ai-container">
      <button className="generate-crossword-button-ai" onClick={generateCrossword} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate New Crossword'}
      </button>

      {crosswordData && (
        <>
          <h2>Word List</h2>
          <button className="show-word-bank-button" onClick={() => setShowWordBank(!showWordBank)}>
            {showWordBank ? 'Hide Word List' : 'Show Word List'}
          </button>
          {showWordBank && <pre>{crosswordData.word_bank.toUpperCase()}</pre>}

          <h2>Crossword Solution</h2>
          <button className="show-crossword-solution-button" onClick={() => setShowSolution(!showSolution)}>
          {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && crosswordData && <CrosswordGridAi solution={crosswordData.solution} />}

          <h2>Crossword</h2>
          <button className="show-crossword-button" onClick={() => setShowDisplay(!showDisplay)}>
            {showDisplay ? 'Hide Crossword' : 'Show Crossword'}
          </button>
          {showDisplay && crosswordData && (
  <GeneratePuzzle 
    solution={crosswordData.solution} 
    display={crosswordData.display}
  />
)}
          <h2>Words Placed</h2>
          <button className="show-legend-button" onClick={() => setShowLegend(!showLegend)}>
            {showLegend ? 'Hide Words Placed' : 'Show Words Places'}
          </button>
          {showLegend && <pre>{crosswordData.legend}</pre>}

          <p>Words placed: {crosswordData.words_placed} out of {crosswordData.total_words}</p>
          <p>Debug: {crosswordData.debug}</p>
        </>
      )}
    </div>
  );
}