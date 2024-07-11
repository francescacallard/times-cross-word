import React from 'react'
import './styles.css'
import { useApp } from '../../context/AppContext'
import axios from 'axios'

export const GenerateList = () => {
  const { randomList, setRandomList } = useApp()

  const handleGenerateListAI = async (event) => {
    const systemPrompt = {
      role: 'system',
      content: `You are a master at creating crosswords. Your job is to give a list of 32 words to create a cross word. Write the response as a comma-separated list with nothing else.`
    }
    const userMessage = {
      role: 'user',
      content: `The user has requested a list of 32 words to create a crossword.`
    }
    try {
      const messages = [systemPrompt, userMessage]
      const response = await axios.post('http://localhost:5000/list', { messages })
      const aiResponse = response.data.aiResponse
      const wordList = aiResponse.split(',').map(word => word.trim())
      setRandomList(wordList)
      
      console.log("AI Response: ", wordList)
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