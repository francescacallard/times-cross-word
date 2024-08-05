import React from 'react'
import { useIntl } from 'react-intl'
import { GenerateCrossword } from 'components/GenerateCrossword'
import { PaintGrid } from 'components/PaintGrid'
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <PaintGrid />
      <GenerateCrossword />
    </div>
  );
}

export default Index