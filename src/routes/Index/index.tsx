import React from 'react'
import { useIntl } from 'react-intl'
// import { GenerateList } from 'components/GenerateList'
import { GenerateCrosswordAi } from 'components/GenerateCrosswordAi'  
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <GenerateCrosswordAi />
      {/* <GenerateList /> */}
    </div>
  );
}

export default Index
