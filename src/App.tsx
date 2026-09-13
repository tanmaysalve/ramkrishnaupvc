import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RequestProvider } from './contexts/RequestContext'
import { AppRoutes } from './routes/AppRoutes'
import { initializeDemoData } from './data/seedData'
import './styles.css'

export default function App(){useEffect(()=>initializeDemoData(),[]);return <BrowserRouter><AuthProvider><RequestProvider><AppRoutes/></RequestProvider></AuthProvider></BrowserRouter>}