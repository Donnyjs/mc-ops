import React from 'react'
import { useRoutes } from 'react-router-dom'
import {routerTable} from './router/index'
import './css/app.css'


export default function App() {
  const element = useRoutes(routerTable)
  
  return (
    <div id="app" style={{"height":"100%"}}>
      {element}
    </div>
  )
}
