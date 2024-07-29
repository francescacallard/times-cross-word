import React from 'react'
import { useIntl } from 'react-intl'
import { ClueProvider } from '../../context/ClueContext'
import { GenerateCrossword } from 'components/GenerateCrossword'
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <ClueProvider>
      <GenerateCrossword />
      </ClueProvider>
    </div>
  );
}

export default Index
