import React from 'react'
import './styles.css'
import { GenerateCrosswordButton } from '../GenerateCrosswordButton'
import Sparkle from '../../assets/sparkle.svg'

export const CrosswordTitle = () =>{
  return (
    <div>
      <header className='title-container-across'>
        <div className='title-img-container'>
        <img src={Sparkle} alt='sparkle' className='sparkle'/>  
      <h1 className='ai-crossword-crafter-title'>AI crossword crafter</h1>
      </div>
      <div className="header-buttons">
      <GenerateCrosswordButton />
      </div>
    </header>
    </div>
  )
}

