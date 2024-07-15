import React from 'react'
import { useIntl } from 'react-intl'
import { GenerateList } from 'components/GenerateList'
import 'App.css'

const Index: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <div className="App">
      <GenerateList />
    </div>
  );
}

export default Index
