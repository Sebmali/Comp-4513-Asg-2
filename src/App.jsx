import { useState } from 'react'
import LoginPage from "./LoginPage.jsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GalleryView from './components/GalleyView/GalleryView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <LoginPage />
    </div>
  )
}

export default App
