import React from 'react'
import './styles.css'
import { useApp } from '../../context/AppContext'
import axios from 'axios'

export const GenerateList = () => {
  const { randomList, setRandomList } = useApp()

  const cleanAIResponse = (response) => {
    // Remove any markdown code block delimiters
    let cleaned = response.replace(/```json\s?|```/g, '');
    
    // Trim any whitespace at the start or end
    cleaned = cleaned.trim();
    
    return cleaned;
  };

  const handleGenerateListAI = async (event) => {
    const systemPrompt = {
      role: 'system',
      content: `
Generate a crossword puzzle with the following specifications:
- 10 words total (5 across, 5 down)
- Grid size: 13x13
- For each word, provide:
  - Word
  - Clue
  - Direction (across or down)
  - Starting position (x, y coordinates, 0-indexed)
  - Word length

Format the response as a JSON object with the following structure with no other text at all:
{
  "entries": [
    {
      "word": "EXAMPLE",
      "clue": "This is an example clue",
      "direction": "across",
      "position": {"x": 0, "y": 0},
      "length": 7
    },
    ...
  ]
}

Ensure that words intersect properly and fit within the 13x13 grid.
`
    }
    const userMessage = {
      role: 'user',
      content: `Create a crossword in the required format in the system prompt`
    }
    try {
      const messages = [systemPrompt, userMessage]
      const response = await axios.post('http://localhost:5000/list', { messages })
      const aiResponse = response.data.aiResponse
      const cleanedResponse = cleanAIResponse(aiResponse);
      const crosswordData = JSON.parse(cleanedResponse);
      console.log("Crossword Data: ", crosswordData)
      console.log("AI Response: ", aiResponse)
    } catch (error) {
      console.error("Error message: ", error)
    }
  }

  return (
    <div className='generate-list-container'>
      <button className='generate-list-button' onClick={handleGenerateListAI}>Generate List</button>
      <div className='list-container'>
        <div className='list-column'>
          {randomList.slice(0, 16).map((item, index) => (
            <div key={index} className='list-item'>
              {item}
            </div>
          ))}
        </div>
        <div className='list-column'>
        {randomList.slice(16).map((item, index) => (
          <div key={index} className='list-item'>
            {item}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}