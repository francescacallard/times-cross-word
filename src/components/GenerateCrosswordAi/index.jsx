import React from 'react';
import { useApp } from 'context/AppContext';
import { CrosswordGridAi } from 'components/CrosswordGridAi';
import { GeneratePuzzle } from 'components/GeneratePuzzle';
import { CluesAi } from 'components/CluesAi';
import './styles.css';

export const GenerateCrosswordAi = () => {
  const {
    crosswordData,
    setCrosswordData,
    isLoading,
    setIsLoading,
    error,
    setError,
    showWordBank,
    setShowWordBank,
    showSolution,
    setShowSolution,
    showDisplay,
    setShowDisplay,
    showLegend,
    setShowLegend
  } = useApp(); 

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
        <div className='crossword-list-container'>
          <button className="show-word-bank-button" onClick={() => setShowWordBank(!showWordBank)}>
            {showWordBank ? 'Hide Word List' : 'Show Word List'}
          </button>
          {showWordBank && <pre>{crosswordData.word_bank.toUpperCase()}</pre>}
        </div>
        <div className='crossword-solution-container-margin'>
          <button className="show-crossword-solution-button" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          {showSolution && (
            <div className="crossword-and-clues">
              <CrosswordGridAi solution={crosswordData.solution} />
              <CluesAi legend={crosswordData.legend} />
            </div>
          )}
          </div>
          <div className='crossword-puzzle-container-margin'>
          <button className="show-crossword-button" onClick={() => setShowDisplay(!showDisplay)}>
            {showDisplay ? 'Hide Crossword' : 'Show Crossword'}
          </button>
          {showDisplay && (
            <div className="crossword-and-clues">
              <GeneratePuzzle 
                solution={crosswordData.solution} 
                legend={crosswordData.legend}
              />
              <CluesAi legend={crosswordData.legend} />
            </div>
          )}
          </div>
          <p>Words placed: {crosswordData.words_placed} out of {crosswordData.total_words}</p>
          <p>Debug: {crosswordData.debug}</p>
        </>
      )}
    </div>
  );
}