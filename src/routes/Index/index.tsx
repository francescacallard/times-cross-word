import React from 'react'
import { useIntl } from 'react-intl'
import { GenerateList } from 'components/GenerateList'
import { GenerateSolution } from 'components/GenerateSolution'
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <GenerateList />
      <GenerateSolution />
    </div>
  );
}

export default Index
