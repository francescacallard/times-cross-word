import React from 'react'
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route
} from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Routes } from 'routes/constants'
import Index from 'routes/Index'
import 'App.css'

const App: React.FC = () => (

  
  <BrowserRouter>
  <AppProvider>
    <ReactRoutes>
      <Route path={Routes.Index} element={<Index />}/>
    </ReactRoutes>
    </AppProvider>
  </BrowserRouter>
)

export default App
