import React from 'react'
import './styles.css'
import { GenerateCrosswordButton } from '../GenerateCrosswordButton'
import Sparkle from '../../assets/orangeSparkle.svg'
import { Toggle } from 'components/Toggle'

export const CrosswordTitle = ({ onToggle }) =>{
  return (
    <div className='title-buttons-container'>
    <div>
      <header className='title-container-across'>
        <div className='title-img-container'>
        <img src={Sparkle} alt='sparkle' className='sparkle'/>  
      <h1 className='ai-crossword-crafter-title'>AI crossword crafter</h1>
      </div>
      <div className="header-buttons">
      <GenerateCrosswordButton />
      <Toggle onToggle={onToggle} />
      </div>
    </header>
    </div>
    </div>
  )
}

