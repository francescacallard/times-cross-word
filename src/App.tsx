import React from 'react'
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route
} from 'react-router-dom'
import { Routes } from 'routes/constants'
import Index from 'routes/Index'
import 'App.css'

const App: React.FC = () => (
  <BrowserRouter>
    <ReactRoutes>
      <Route path={Routes.Index} element={<Index />}/>
    </ReactRoutes>
  </BrowserRouter>
)

export default App
