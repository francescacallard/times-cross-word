import React from 'react'
import { useIntl } from 'react-intl'
import { GenerateCrossword } from 'components/GenerateCrossword'
import { GenerateCrosswordAi } from 'components/GenerateCrosswordAi'  
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <GenerateCrosswordAi />
      <GenerateCrossword />
    </div>
  );
}

export default Index
