import React from 'react'
import { GenerateCrossword } from 'components/GenerateCrossword'
import { PaintGrid } from 'components/PaintGrid'
import 'App.css'

const Index: React.FC = () => {

  return (
    <div className="App">
      <GenerateCrossword />
      <PaintGrid />
    </div>
  );
}

export default Index
