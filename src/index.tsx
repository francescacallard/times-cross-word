import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import store from 'redux/store'
import messages from 'i18n/en_US'
import App from './App'
import 'index.css'

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale="en" defaultLocale="en" messages={messages}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
)
