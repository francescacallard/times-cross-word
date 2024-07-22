import React, { useState, useEffect } from 'react';

export const PythonTest = () => {
  const [crosswordData, setCrosswordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showWordBank, setShowWordBank] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showWordFind, setShowWordFind] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

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
    <div>
      <button onClick={generateCrossword} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate New Crossword'}
      </button>

      {crosswordData && (
        <>
          <h2>Word Bank</h2>
          <button onClick={() => setShowWordBank(!showWordBank)}>
            {showWordBank ? 'Show Word List' : 'Hide Word List'}
          </button>
          {showWordBank && <pre>{crosswordData.word_bank}</pre>}

          <h2>Crossword Solution</h2>
          <button onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && <pre>{crosswordData.solution}</pre>}

          <h2>Word Find</h2>
          <button onClick={() => setShowWordFind(!showWordFind)}>
            {showWordFind ? 'Hide Word Find' : 'Show Word Find'}
          </button>
          {showWordFind && <pre>{crosswordData.word_find}</pre>}

          <h2>Crossword</h2>
          <button onClick={() => setShowDisplay(!showDisplay)}>
            {showDisplay ? 'Hide Crossword' : 'Show Crossword'}
          </button>
          {showDisplay && <pre>{crosswordData.display}</pre>}

          <h2>Words Placed</h2>
          <button onClick={() => setShowLegend(!showLegend)}>
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